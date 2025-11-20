import './style.css'
import typescriptLogo from './typescript.svg'
import {
  loadCodeExample,
  executeCode,
  formatCodeForDisplay,
  parseCodeIntoSections,
} from '@/lib/sandbox.ts'

// Concepts TypeScript avec descriptions et fichiers associés
const concepts = [
  {
    id: 'inference',
    title: 'Inférence de Type',
    description:
      "TypeScript peut automatiquement inférer le type d'une variable à partir de sa valeur initiale.",
    icon: '🔍',
    filename: 'inference.ts',
  },
  {
    id: 'generic',
    title: 'Fonctions Génériques',
    description:
      'Les fonctions génériques permettent de créer des fonctions réutilisables qui fonctionnent avec différents types.',
    icon: '⚙️',
    filename: 'generic.ts',
  },
  {
    id: 'void-never',
    title: 'Void et Never',
    description:
      "void indique qu'une fonction ne retourne rien, never indique qu'elle ne retournera jamais.",
    icon: '🚫',
    filename: 'void-never.ts',
  },
  {
    id: 'enum',
    title: 'Enums',
    description:
      'Les enums permettent de définir un ensemble de constantes nommées pour un groupe de valeurs fixes.',
    icon: '📋',
    filename: 'enum.ts',
  },
  {
    id: 'objects',
    title: "Types d'Objets",
    description:
      'Différentes façons de typer des objets : interfaces, types, propriétés optionnelles, readonly.',
    icon: '📦',
    filename: 'object-types.ts',
  },
  {
    id: 'dictionary',
    title: 'Dictionnaires',
    description: 'Comment typer des dictionnaires avec Record<K, V> et les index signatures.',
    icon: '📚',
    filename: 'dictionary.ts',
  },
  {
    id: 'functions',
    title: 'Fonctions',
    description:
      'Tout sur les fonctions : paramètres, types de retour, génériques, callbacks, async/await.',
    icon: '⚡',
    filename: 'functions.ts',
  },
  {
    id: 'utility-types',
    title: 'Types Utilitaires',
    description:
      'Partial, Record, Required et autres types utilitaires pour transformer des types.',
    icon: '🛠️',
    filename: 'utility-types.ts',
  },
  {
    id: 'readonly',
    title: 'Readonly',
    description: 'Le mot-clé readonly pour rendre des propriétés, tableaux ou objets immuables.',
    icon: '🔒',
    filename: 'readonly.ts',
  },
  {
    id: 'pick-omit',
    title: 'Pick et Omit',
    description:
      'Pick sélectionne des propriétés, Omit les exclut. Utiles pour créer de nouveaux types.',
    icon: '✂️',
    filename: 'pick-omit.ts',
  },
  {
    id: 'functions-advanced',
    title: 'Concepts Avancés de Fonctions',
    description:
      'Concepts avancés : déclarations de fonctions, paramètres optionnels, génériques complexes, surcharge, enums et alternatives modernes.',
    icon: '🚀',
    filename: 'functions-advanced.ts',
  },
]

// Créer l'interface
function createApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app')!

  app.innerHTML = `
    <div class="app-container">
      <header class="header">
        <div class="header-content">
          <div class="logo-container">
            <img src="${typescriptLogo}" class="logo" alt="TypeScript logo" />
            <h1>Guide TypeScript</h1>
          </div>
          <p class="subtitle">Apprenez TypeScript avec des exemples pratiques</p>
        </div>
      </header>

      <div class="main-content">
        <aside class="sidebar">
          <h2>Concepts</h2>
          <nav class="concept-nav">
            ${concepts
              .map(
                (concept) => `
              <button class="concept-btn" data-concept="${concept.id}">
                <span class="concept-icon">${concept.icon}</span>
                <span class="concept-title">${concept.title}</span>
              </button>
            `,
              )
              .join('')}
          </nav>
        </aside>

        <main class="content-area">
          <div class="concept-display">
            <div class="welcome-message">
              <h2>👋 Bienvenue dans le Guide TypeScript</h2>
              <p>Sélectionnez un concept dans le menu de gauche pour voir les exemples de code et exécuter les sandbox.</p>
              <div class="stats">
                <div class="stat">
                  <span class="stat-number">${concepts.length}</span>
                  <span class="stat-label">Concepts</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `

  // Gérer les boutons de concepts
  const conceptButtons = document.querySelectorAll<HTMLButtonElement>('.concept-btn')
  conceptButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const conceptId = btn.dataset.concept
      if (conceptId) {
        showConcept(conceptId)

        // Mettre à jour l'état actif
        conceptButtons.forEach((b) => b.classList.remove('active'))
        btn.classList.add('active')
      }
    })
  })

  // Afficher le premier concept par défaut
  if (conceptButtons.length > 0) {
    const firstButton = conceptButtons[0]
    if (firstButton) {
      firstButton.click()
    }
  }
}

async function showConcept(conceptId: string): Promise<void> {
  const concept = concepts.find((c) => c.id === conceptId)
  if (!concept) return

  const conceptDisplay = document.querySelector('.concept-display')!

  // Afficher un loader pendant le chargement
  conceptDisplay.innerHTML = `
    <div class="concept-content">
      <div class="concept-header">
        <span class="concept-icon-large">${concept.icon}</span>
        <h2>${concept.title}</h2>
      </div>
      <p class="concept-description">${concept.description}</p>
      <div class="loading">Chargement du code...</div>
    </div>
  `

  try {
    // Charger le code source
    const code = await loadCodeExample(concept.filename)

    // Vérifier si le fichier doit être divisé en sections (functions-advanced.ts)
    const shouldUseSections = concept.filename === 'functions-advanced.ts'
    const sections = shouldUseSections ? parseCodeIntoSections(code) : null

    if (sections && sections.length > 1) {
      // Afficher avec des sections multiples
      const sectionsHtml = sections
        .map(
          (section, index) => `
        <div class="section-container" data-section="${index}">
          <div class="section-header">
            <h3>📚 Section ${section.sectionNumber}: ${section.title}</h3>
            <button class="run-btn" data-concept="${conceptId}" data-section="${index}">
              ▶️ Exécuter cette section
            </button>
          </div>
          <div class="code-editor">
            <pre class="code-block"><code>${formatCodeForDisplay(section.content)}</code></pre>
          </div>
          <div class="sandbox-results" id="sandbox-results-${conceptId}-${index}">
            <div class="results-header">
              <h4>📊 Résultats</h4>
              <button class="clear-results-btn" data-concept="${conceptId}" data-section="${index}">Effacer</button>
            </div>
            <div class="results-content" id="results-content-${conceptId}-${index}">
              <p class="results-placeholder">Cliquez sur "Exécuter cette section" pour voir les résultats</p>
            </div>
          </div>
        </div>
      `,
        )
        .join('')

      conceptDisplay.innerHTML = `
        <div class="concept-content">
          <div class="concept-header">
            <span class="concept-icon-large">${concept.icon}</span>
            <h2>${concept.title}</h2>
          </div>
          <p class="concept-description">${concept.description}</p>
          <div class="sections-container">
            ${sectionsHtml}
          </div>
        </div>
      `

      // Ajouter les event listeners pour chaque section
      sections.forEach((section, index) => {
        const runBtn = conceptDisplay.querySelector(
          `.run-btn[data-concept="${conceptId}"][data-section="${index}"]`,
        )
        const clearBtn = conceptDisplay.querySelector(
          `.clear-results-btn[data-concept="${conceptId}"][data-section="${index}"]`,
        )
        const resultsContent = document.getElementById(`results-content-${conceptId}-${index}`)

        if (runBtn && resultsContent) {
          runBtn.addEventListener('click', () => {
            executeSandboxCode(section.content, resultsContent)
          })
        }

        if (clearBtn && resultsContent) {
          clearBtn.addEventListener('click', () => {
            resultsContent.innerHTML =
              '<p class="results-placeholder">Cliquez sur "Exécuter cette section" pour voir les résultats</p>'
          })
        }
      })
    } else {
      // Afficher le sandbox unique (comportement par défaut)
      conceptDisplay.innerHTML = `
        <div class="concept-content">
          <div class="concept-header">
            <span class="concept-icon-large">${concept.icon}</span>
            <h2>${concept.title}</h2>
          </div>
          <p class="concept-description">${concept.description}</p>
          
          <div class="sandbox-container">
            <div class="sandbox-header">
              <h3>📝 Code Source</h3>
              <button class="run-btn" data-concept="${conceptId}">
                ▶️ Exécuter le code
              </button>
            </div>
            <div class="code-editor">
              <pre class="code-block"><code>${formatCodeForDisplay(code)}</code></pre>
            </div>
            
            <div class="sandbox-results" id="sandbox-results-${conceptId}">
              <div class="results-header">
                <h3>📊 Résultats</h3>
                <button class="clear-results-btn" data-concept="${conceptId}">Effacer</button>
              </div>
              <div class="results-content" id="results-content-${conceptId}">
                <p class="results-placeholder">Cliquez sur "Exécuter le code" pour voir les résultats</p>
              </div>
            </div>
          </div>
        </div>
      `

      // Ajouter les event listeners pour les boutons
      const runBtn = conceptDisplay.querySelector(`.run-btn[data-concept="${conceptId}"]`)
      const clearBtn = conceptDisplay.querySelector(
        `.clear-results-btn[data-concept="${conceptId}"]`,
      )
      const resultsContent = document.getElementById(`results-content-${conceptId}`)

      if (runBtn && resultsContent) {
        runBtn.addEventListener('click', () => {
          executeSandboxCode(code, resultsContent)
        })
      }

      if (clearBtn && resultsContent) {
        clearBtn.addEventListener('click', () => {
          resultsContent.innerHTML =
            '<p class="results-placeholder">Cliquez sur "Exécuter le code" pour voir les résultats</p>'
        })
      }
    }
  } catch (error) {
    conceptDisplay.innerHTML = `
      <div class="concept-content">
        <div class="concept-header">
          <span class="concept-icon-large">${concept.icon}</span>
          <h2>${concept.title}</h2>
        </div>
        <p class="concept-description">${concept.description}</p>
        <div class="error-message">
          ❌ Erreur lors du chargement du code: ${error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    `
  }
}

function executeSandboxCode(code: string, resultsContainer: HTMLElement): void {
  // Afficher un loader
  resultsContainer.innerHTML = '<div class="loading">Exécution en cours...</div>'

  // Exécuter le code
  const result = executeCode(code)

  // Afficher les résultats
  if (result.error) {
    resultsContainer.innerHTML = `
      <div class="error-result">
        <strong>❌ Erreur:</strong>
        <pre>${escapeHtml(result.error)}</pre>
      </div>
    `
  } else if (result.logs.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <p>✅ Code exécuté avec succès, mais aucun log n'a été généré.</p>
      </div>
    `
  } else {
    const logsHtml = result.logs
      .map((log) => {
        const time = log.timestamp.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3,
        })
        const typeClass = `log-${log.type}`
        const formattedMessage = formatLogMessage(log.message)
        return `
        <div class="log-entry ${typeClass}">
          <span class="log-time">[${time}]</span>
          <span class="log-type">${log.type.toUpperCase()}</span>
          <span class="log-message">${formattedMessage}</span>
        </div>
      `
      })
      .join('')

    resultsContainer.innerHTML = `
      <div class="logs-container">
        ${logsHtml}
      </div>
    `

    // Scroll vers le bas
    resultsContainer.scrollTop = resultsContainer.scrollHeight
  }
}

function formatLogMessage(message: string): string {
  // Échapper le HTML
  let formatted = escapeHtml(message)

  // Mettre en évidence les valeurs importantes
  formatted = formatted
    // Mettre en évidence les nombres
    .replace(/(\d+)/g, '<span class="log-number">$1</span>')
    // Mettre en évidence les strings
    .replace(/"([^"]+)"/g, '<span class="log-string">"$1"</span>')
    // Mettre en évidence les booléens
    .replace(/\b(true|false)\b/g, '<span class="log-boolean">$1</span>')
    // Mettre en évidence les null/undefined
    .replace(/\b(null|undefined)\b/g, '<span class="log-null">$1</span>')
    // Mettre en évidence les objets/tableaux
    .replace(/(\{[^}]*\}|\[[^\]]*\])/g, '<span class="log-object">$1</span>')

  return formatted
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Initialiser l'application
createApp()
