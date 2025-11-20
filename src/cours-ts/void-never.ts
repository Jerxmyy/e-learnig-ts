/**
 * Différence entre `void` et `never` en TypeScript
 *
 * ## `void` - Fonction qui ne retourne rien (ou retourne undefined)
 *
 * `void` est utilisé pour indiquer qu'une fonction ne retourne **aucune valeur utile**.
 * En JavaScript/TypeScript, une fonction sans `return` retourne implicitement `undefined`.
 * `void` représente ce comportement au niveau des types.
 *
 * ### Cas d'utilisation de `void` :
 * 1. Fonctions qui ne retournent rien explicitement
 * 2. Callbacks qui ne doivent pas retourner de valeur
 * 3. Event handlers
 * 4. Fonctions qui font des effets de bord (side effects) sans retourner de valeur
 */

// Exemple 1 : Fonction qui ne retourne rien
function afficherMessage(message: string): void {
  console.log(message)
  // Pas de return, retourne implicitement undefined
}

afficherMessage('Bonjour')

// Exemple 2 : Fonction avec return undefined explicite
function logger(data: unknown): void {
  console.log(data)
  return undefined // Explicite mais redondant
}

logger({ name: 'Test' })

// Exemple 3 : Callback avec void
const nombres = [1, 2, 3, 4, 5]

// forEach attend un callback qui retourne void
nombres.forEach((n: number): void => {
  console.log(n)
  // Pas besoin de return
})

// Exemple 4 : Type de fonction qui retourne void
type EventHandler = (event: Event) => void

const handleClick: EventHandler = (event) => {
  console.log('Click détecté', event)
  // Pas de return nécessaire
}

// Exemple d'utilisation (simulé)
// document.addEventListener('click', handleClick)

// Démonstration du type
console.log('Type EventHandler:', typeof handleClick)

// Exemple 5 : Variable typée void
let result: void
// result = 5 // ❌ Erreur : on ne peut assigner que undefined à void
result = undefined // ✅ OK
console.log('Variable void result:', result)

/**
 * ## `never` - Fonction qui ne retourne JAMAIS (ou type qui ne peut jamais exister)
 *
 * `never` est utilisé pour indiquer qu'une fonction **ne retournera jamais** une valeur,
 * soit parce qu'elle lance toujours une exception, soit parce qu'elle entre dans une boucle infinie,
 * ou parce qu'elle représente un type qui ne peut jamais exister.
 *
 * ### Cas d'utilisation de `never` :
 * 1. Fonctions qui lancent toujours une exception
 * 2. Fonctions avec des boucles infinies
 * 3. Type qui représente l'impossible (ex: intersection de types incompatibles)
 * 4. Type guards exhaustifs dans les unions discriminées
 * 5. Fonctions qui appellent process.exit() ou équivalent
 */

// Exemple 1 : Fonction qui lance toujours une exception
function throwError(message: string): never {
  throw new Error(message)
  // Le code après cette ligne n'est jamais atteint
}

// throwError('Erreur critique') // Lance une exception, ne retourne jamais

// Exemple 2 : Fonction avec boucle infinie
// ⚠️ Cette fonction est un exemple éducatif - ne pas appeler !
function infiniteLoop(): never {
  while (true) {
    console.log('Boucle infinie...')
    // Cette fonction ne retournera jamais
  }
  // TypeScript sait que cette ligne n'est jamais atteinte
}

// Démonstration du type de retour
type InfiniteLoopType = ReturnType<typeof infiniteLoop>
console.log('Type de retour infiniteLoop:', 'never' as InfiniteLoopType)

// Exemple 3 : Fonction qui appelle process.exit()
// ⚠️ Cette fonction est un exemple éducatif - ne pas appeler en développement !
function exitProgram(code: number): never {
  console.log('Arrêt du programme...')
  // process.exit(code) // Commenté car process n'existe pas dans le navigateur
  throw new Error(`Process exit with code ${code}`) // Alternative pour le navigateur
  // Ne retourne jamais car le processus se termine
}

// Démonstration du type de retour
type ExitProgramType = ReturnType<typeof exitProgram>
console.log('Type de retour exitProgram:', 'never' as ExitProgramType)

// Exemple 4 : Type guard exhaustif avec never
type Animal = 'dog' | 'cat' | 'bird'

function handleAnimal(animal: Animal): string {
  switch (animal) {
    case 'dog':
      return 'Woof!'
    case 'cat':
      return 'Meow!'
    case 'bird':
      return 'Tweet!'
    default:
      // TypeScript infère que animal est de type never ici
      // car tous les cas possibles sont couverts
      const exhaustiveCheck: never = animal
      throw new Error(`Animal inconnu: ${exhaustiveCheck}`)
  }
}

console.log(handleAnimal('dog'))
console.log(handleAnimal('cat'))

// Exemple 5 : Intersection de types incompatibles = never
type Impossible = string & number
// Impossible est de type never car une valeur ne peut pas être string ET number

// Démonstration : Impossible est de type never
const impossibleValue: Impossible = null as never
console.log('Type impossible:', typeof impossibleValue)

// Exemple 6 : Union avec never (never disparaît)
type Union = string | number | never
// Équivaut à : type Union = string | number
// never n'ajoute rien à une union

// Démonstration
const unionValue: Union = 'test'
console.log('Union value:', unionValue)

/**
 * ## Différences clés entre `void` et `never`
 *
 * | Aspect | `void` | `never` |
 * |--------|--------|---------|
 * | **Retour** | Retourne `undefined` implicitement | Ne retourne JAMAIS |
 * | **Valeur assignable** | `undefined` uniquement | Aucune valeur (type bottom) |
 * | **Utilisation** | Fonctions normales sans retour | Fonctions qui ne terminent jamais |
 * | **Assignation** | `let x: void = undefined` ✅ | `let x: never = ...` ❌ (impossible) |
 * | **Dans les unions** | Peut être combiné avec d'autres types | Disparaît dans les unions |
 *
 * ## Règles pratiques
 *
 * ### Utilisez `void` quand :
 * - La fonction fait quelque chose mais ne retourne pas de valeur
 * - Vous voulez indiquer explicitement qu'il n'y a pas de retour utile
 * - Vous définissez des callbacks qui ne doivent pas retourner de valeur
 *
 * ### Utilisez `never` quand :
 * - La fonction lance toujours une exception
 * - La fonction a une boucle infinie
 * - Vous voulez garantir l'exhaustivité dans un switch/if
 * - Vous représentez un type qui ne peut jamais exister
 */

// Exemple pratique : Gestion d'erreurs
function processData(data: unknown): string {
  if (typeof data !== 'string') {
    throwError('Les données doivent être une chaîne') // Type never
  }
  // TypeScript sait que data est string ici grâce au type narrowing
  return data.toUpperCase()
}

// Exemple d'utilisation
console.log('Processed:', processData('hello'))
// console.log(processData(123)) // Lancerait une exception

// Exemple pratique : Validation exhaustive
type Status = 'loading' | 'success' | 'error'

function handleStatus(status: Status): void {
  switch (status) {
    case 'loading':
      console.log('Chargement...')
      break
    case 'success':
      console.log('Succès!')
      break
    case 'error':
      console.log('Erreur!')
      break
    default:
      // Si on ajoute un nouveau cas à Status sans l'ajouter ici,
      // TypeScript détectera l'erreur car status ne sera plus never
      const _exhaustive: never = status
      throw new Error(`Status inconnu: ${_exhaustive}`)
  }
}

handleStatus('loading')
handleStatus('success')
handleStatus('error')

/**
 * ## Résumé
 *
 * - **`void`** : "Cette fonction ne retourne rien d'utile" (retourne undefined)
 * - **`never`** : "Cette fonction ne retournera jamais" (exception, boucle infinie, etc.)
 *
 * Pensez à `void` comme "pas de valeur de retour" et `never` comme "impossible d'atteindre la fin".
 */

