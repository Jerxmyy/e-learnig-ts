/**
 * Système de Sandbox pour exécuter et afficher du code TypeScript
 */

export interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  filename: string
}

export interface SandboxResult {
  logs: Array<{
    type: 'log' | 'info' | 'warn' | 'error'
    message: string
    timestamp: Date
  }>
  error?: string
}

export interface CodeSection {
  title: string
  content: string
  sectionNumber: number
}

/**
 * Charge le contenu d'un fichier de cours
 * Utilise des imports dynamiques avec ?raw pour charger les fichiers TypeScript comme texte
 */
export async function loadCodeExample(filename: string): Promise<string> {
  try {
    // Mapping des noms de fichiers vers leurs imports
    const fileMap: Record<string, () => Promise<{ default: string }>> = {
      'inference.ts': () => import('../cours-ts/inference.ts?raw'),
      'generic.ts': () => import('../cours-ts/generic.ts?raw'),
      'void-never.ts': () => import('../cours-ts/void-never.ts?raw'),
      'enum.ts': () => import('../cours-ts/enum.ts?raw'),
      'object-types.ts': () => import('../cours-ts/object-types.ts?raw'),
      'dictionary.ts': () => import('../cours-ts/dictionary.ts?raw'),
      'functions.ts': () => import('../cours-ts/functions.ts?raw'),
      'utility-types.ts': () => import('../cours-ts/utility-types.ts?raw'),
      'readonly.ts': () => import('../cours-ts/readonly.ts?raw'),
      'pick-omit.ts': () => import('../cours-ts/pick-omit.ts?raw'),
      'functions-advanced.ts': () => import('../cours-ts/functions-advanced.ts?raw'),
    }

    const loader = fileMap[filename]
    if (!loader) {
      throw new Error(`Fichier ${filename} non trouvé dans le mapping`)
    }

    const module = await loader()
    return module.default || ''
  } catch (error) {
    console.error(`Erreur lors du chargement de ${filename}:`, error)
    // Fallback: retourner un message d'erreur
    return `// Erreur: Impossible de charger le fichier ${filename}\n// ${error instanceof Error ? error.message : String(error)}`
  }
}

/**
 * Parse un fichier TypeScript en sections basées sur les commentaires SECTION
 * Retourne un tableau de sections avec leur titre et contenu
 */
export function parseCodeIntoSections(code: string): CodeSection[] {
  // Pattern pour détecter les sections : // ============================================================================
  // // SECTION X: Titre
  // // ============================================================================
  const sectionPattern = /\/\/\s*={60,}\s*\n\/\/\s*SECTION\s+(\d+):\s*(.+?)\s*\n\/\/\s*={60,}/g

  const sections: CodeSection[] = []
  const matches: Array<{ num: number; title: string; index: number; endIndex: number }> = []

  // Trouver toutes les sections
  let match: RegExpExecArray | null
  while ((match = sectionPattern.exec(code)) !== null) {
    const sectionNum = match[1] ? parseInt(match[1], 10) : 0
    const sectionTitle = match[2] ? match[2].trim() : 'Section'
    matches.push({
      num: sectionNum,
      title: sectionTitle,
      index: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  // Si aucune section trouvée, retourner le code entier comme une seule section
  if (matches.length === 0) {
    return [
      {
        title: 'Code complet',
        content: code,
        sectionNumber: 1,
      },
    ]
  }

  // Extraire le contenu de chaque section
  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i]
    if (!currentMatch) continue

    const nextMatch = matches[i + 1]

    // Le contenu de la section commence après le header de section
    const sectionStart = currentMatch.endIndex
    // Et se termine au début de la prochaine section (ou à la fin du fichier)
    const sectionEnd = nextMatch ? nextMatch.index : code.length

    const sectionContent = code.substring(sectionStart, sectionEnd).trim()

    if (sectionContent) {
      sections.push({
        title: currentMatch.title,
        content: sectionContent,
        sectionNumber: currentMatch.num,
      })
    }
  }

  return sections
}

/**
 * Nettoie le code TypeScript pour l'exécution
 * Supprime tous les éléments TypeScript qui empêchent l'exécution JavaScript
 * en préservant les commentaires de ligne utiles
 */
function cleanCodeForExecution(code: string): string {
  let cleaned = code

  // Supprimer les imports (ils ne sont pas nécessaires pour l'exécution dans le navigateur)
  cleaned = cleaned.replace(/^import\s+.*$/gm, '')

  // Supprimer les exports (non nécessaires pour l'exécution)
  cleaned = cleaned.replace(/^export\s+(default\s+)?/gm, '')

  // Supprimer uniquement les commentaires de documentation JSDoc (/** ... */)
  // mais préserver les commentaires de ligne (//) qui peuvent contenir des explications importantes
  cleaned = cleaned.replace(/\/\*\*[\s\S]*?\*\//g, '')

  // Supprimer les déclarations de type/interface qui ne peuvent pas être exécutées
  // Format: type Name = ... ou interface Name { ... }
  cleaned = cleaned.replace(/^(type|interface)\s+\w+[^=]*=\s*[^;]+;?/gm, '')
  cleaned = cleaned.replace(/^(type|interface)\s+\w+\s*\{[\s\S]*?\}\s*$/gm, '')

  // Supprimer les génériques dans les déclarations de fonction : function test<T>(...) -> function test(...)
  // Attention: ne pas supprimer les opérateurs de comparaison < et >
  cleaned = cleaned.replace(/(function\s+\w+)\s*<[A-Z]\w*(?:,\s*[A-Z]\w*)*>/g, '$1')
  cleaned = cleaned.replace(
    /(const\s+\w+\s*:\s*\([^)]*\)\s*=>)\s*<[A-Z]\w*(?:,\s*[A-Z]\w*)*>/g,
    '$1',
  )

  // Supprimer les annotations de type dans les paramètres de fonction
  // Exemple: function test(x: number, y: string) -> function test(x, y)
  // Gérer aussi: function test(this: Type, x: number) -> function test(x)
  // Gérer les paramètres rest: ...args: number[] -> ...args
  cleaned = cleaned.replace(/function\s+(\w+)\s*\(([^)]*)\)/g, (match, funcName, params) => {
    if (!params.trim()) return `function ${funcName}()`

    // Nettoyer les paramètres : supprimer les types et les paramètres "this: Type"
    const cleanedParams = params
      .split(',')
      .map((param: string) => {
        const trimmed = param.trim()
        // Supprimer les paramètres "this: Type"
        if (trimmed.startsWith('this:')) return ''

        // Gérer les paramètres rest : "...args: number[]" -> "...args"
        if (trimmed.startsWith('...')) {
          const restMatch = trimmed.match(/^\.\.\.(\w+)(?:\s*:\s*[^=]+)?(\s*=.*)?$/)
          if (restMatch) {
            return '...' + restMatch[1] + (restMatch[2] || '')
          }
        }

        // Supprimer les annotations de type : "x: number" -> "x"
        // Gérer les paramètres avec valeurs par défaut : "x: number = 5" -> "x = 5"
        // Gérer les unions : "x: string | number" -> "x"
        const paramMatch = trimmed.match(/^(\w+)(?:\s*:\s*[^=]+)?(\s*=.*)?$/)
        if (paramMatch) {
          return (paramMatch[1] + (paramMatch[2] || '')).trim()
        }

        // Fallback: supprimer tout ce qui suit ":"
        return trimmed.replace(/:\s*[^=,]+/, '').trim()
      })
      .filter((p: string) => p.length > 0)
      .join(', ')

    return `function ${funcName}(${cleanedParams})`
  })

  // Nettoyer aussi les fonctions fléchées : (x: number, y: string) => ...
  cleaned = cleaned.replace(/\(([^)]*)\)\s*=>/g, (match, params) => {
    if (!params.trim()) return '() =>'

    const cleanedParams = params
      .split(',')
      .map((param: string) => {
        const trimmed = param.trim()
        if (trimmed.startsWith('this:')) return ''
        if (trimmed.startsWith('...')) {
          const restMatch = trimmed.match(/^\.\.\.(\w+)(?:\s*:\s*[^=]+)?$/)
          if (restMatch) return '...' + restMatch[1]
        }
        const paramMatch = trimmed.match(/^(\w+)(?:\s*:\s*[^=]+)?(\s*=.*)?$/)
        if (paramMatch) {
          return (paramMatch[1] + (paramMatch[2] || '')).trim()
        }
        return trimmed.replace(/:\s*[^=,]+/, '').trim()
      })
      .filter((p: string) => p.length > 0)
      .join(', ')

    return `(${cleanedParams}) =>`
  })

  // Supprimer les types de retour dans les fonctions : function test(): number -> function test()
  cleaned = cleaned.replace(/\)\s*:\s*[^{=>\n]+(\s*\{|\s*=>)/g, (match) => {
    return match.replace(/\)\s*:\s*[^{=>\n]+/, ')')
  })

  // Supprimer les types dans les fonctions fléchées typées AVANT les autres déclarations
  // Exemple: const test: (x: number) => number = (x) => ... -> const test = (x) => ...
  // Cette regex gère les types de fonction avec paramètres typés
  // On utilise une approche plus robuste qui gère les paramètres avec types et types de retour complexes
  // Gère aussi les retours à la ligne entre le type et le signe =
  cleaned = cleaned.replace(
    /(const|let|var)\s+(\w+)\s*:\s*\([^)]*\)\s*=>\s*[\s\S]*?=\s*(\([^)]*\)\s*=>)/g,
    '$1 $2 = $3',
  )

  // Supprimer les annotations de type dans les déclarations de variables
  // Exemple: const x: number = 5 -> const x = 5
  // Gérer aussi: let x: string | number = 'test' -> let x = 'test'
  // Ne pas matcher si c'est déjà une fonction fléchée typée (déjà traitée ci-dessus)
  cleaned = cleaned.replace(/(const|let|var)\s+(\w+)\s*:\s*[^=]+(\s*=)/g, '$1 $2$3')

  // Supprimer les "as const", "as number", etc. (assertions de type)
  cleaned = cleaned.replace(
    /\s+as\s+(const|number|string|boolean|any|unknown|void|never|readonly|readonly\s+\[[^\]]+\])/g,
    '',
  )

  // Supprimer les lignes vides multiples pour nettoyer le code
  cleaned = cleaned.replace(/\n\s*\n\s*\n+/g, '\n\n')

  // Supprimer les espaces en début/fin de ligne
  cleaned = cleaned.trim()

  return cleaned
}

/**
 * Exécute du code TypeScript de manière sécurisée
 * Note: Le code TypeScript est exécuté directement car Vite le compile en JavaScript
 * Les annotations de type TypeScript sont ignorées par JavaScript à l'exécution
 */
export function executeCode(code: string): SandboxResult {
  const logs: SandboxResult['logs'] = []
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  }

  // Capturer les logs
  const captureLog = (type: 'log' | 'info' | 'warn' | 'error') => {
    return (...args: unknown[]) => {
      originalConsole[type](...args)
      const message = args
        .map((arg) => {
          if (arg === null) return 'null'
          if (arg === undefined) return 'undefined'
          if (typeof arg === 'object') {
            try {
              if (Array.isArray(arg)) {
                return `[${arg.map((item) => formatValue(item)).join(', ')}]`
              }
              const formatted = JSON.stringify(arg, null, 2)
              return formatted.length > 500 ? formatted.substring(0, 500) + '...' : formatted
            } catch {
              return String(arg)
            }
          }
          if (typeof arg === 'function') {
            return `[Function: ${arg.name || 'anonymous'}]`
          }
          return String(arg)
        })
        .join(' ')

      logs.push({
        type,
        message,
        timestamp: new Date(),
      })
    }
  }

  // Remplacer temporairement console
  console.log = captureLog('log')
  console.info = captureLog('info')
  console.warn = captureLog('warn')
  console.error = captureLog('error')

  let error: string | undefined

  try {
    // Nettoyer le code pour l'exécution
    const cleanCode = cleanCodeForExecution(code)

    // Vérifier que le code n'est pas vide après nettoyage
    if (!cleanCode.trim()) {
      throw new Error(
        'Le code est vide après nettoyage. Vérifiez que le fichier contient du code exécutable.',
      )
    }

    // Exécuter le code dans un contexte isolé
    // Note: Les annotations de type TypeScript sont ignorées par JavaScript à l'exécution
    // Le code doit être du JavaScript valide ou du TypeScript qui peut être exécuté
    try {
      // Utiliser une fonction anonyme pour isoler le scope
      const executeInIsolatedScope = new Function(cleanCode)
      executeInIsolatedScope()
    } catch (execError) {
      // Si l'erreur est liée à la syntaxe TypeScript, fournir un message plus clair
      const errorMessage = execError instanceof Error ? execError.message : String(execError)

      // Vérifier si c'est une erreur de syntaxe TypeScript
      if (
        errorMessage.includes('Unexpected token') ||
        errorMessage.includes('Unexpected identifier') ||
        errorMessage.includes('Unexpected end of input')
      ) {
        throw new Error(
          `Erreur de syntaxe: ${errorMessage}\n\nNote: Certaines syntaxes TypeScript avancées peuvent ne pas être supportées. Vérifiez que le code est du JavaScript valide.`,
        )
      }

      // Vérifier les erreurs de référence
      if (
        errorMessage.includes('is not defined') ||
        errorMessage.includes('Cannot access') ||
        errorMessage.includes('is not a function')
      ) {
        throw new Error(
          `Erreur d'exécution: ${errorMessage}\n\nNote: Vérifiez que toutes les variables et fonctions sont bien définies avant d'être utilisées.`,
        )
      }

      throw execError
    }
  } catch (e) {
    error = e instanceof Error ? e.message : String(e)

    // Ajouter des informations supplémentaires pour les erreurs courantes
    if (error.includes('process')) {
      error +=
        '\n\nNote: "process" n\'est pas disponible dans le navigateur. Utilisez uniquement des APIs du navigateur.'
    }

    logs.push({
      type: 'error',
      message: error,
      timestamp: new Date(),
    })
  } finally {
    // Restaurer les fonctions console originales
    console.log = originalConsole.log
    console.info = originalConsole.info
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  }

  return { logs, error }
}

function formatValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

/**
 * Formate le code pour l'affichage avec syntax highlighting basique
 */
export function formatCodeForDisplay(code: string): string {
  return (
    code
      // Échapper le HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Mettre en évidence les mots-clés TypeScript
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|interface|type|enum|extends|implements|public|private|protected|readonly|static|async|await|import|export|from|as|default)\b/g,
        '<span class="keyword">$1</span>',
      )
      // Mettre en évidence les types
      .replace(
        /\b(number|string|boolean|object|any|unknown|void|never|true|false|null|undefined)\b/g,
        '<span class="type">$1</span>',
      )
      // Mettre en évidence les strings
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
      // Mettre en évidence les nombres
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
      // Mettre en évidence les commentaires
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
  )
}
