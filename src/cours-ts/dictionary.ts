/**
 * Comment typer un dictionnaire (dict) en TypeScript
 *
 * Un dictionnaire est un objet avec des clés dynamiques (string ou number)
 * et des valeurs d'un type spécifique.
 * En TypeScript, il existe plusieurs façons de typer un dictionnaire.
 */

/**
 * ## 1. Index Signature (signature d'index)
 *
 * La méthode la plus courante pour typer un dictionnaire.
 * Syntaxe : { [key: type]: valueType }
 */

// Dictionnaire avec clés string et valeurs number
type StringNumberDict = {
  [key: string]: number
}

const scores: StringNumberDict = {
  math: 95,
  science: 87,
  history: 92,
  english: 88,
}

console.log('Scores:', scores)
console.log('Score en math:', scores.math)
console.log('Score en science:', scores['science'])

// Dictionnaire avec clés string et valeurs string
type StringStringDict = {
  [key: string]: string
}

const simpleTranslations: StringStringDict = {
  hello: 'bonjour',
  goodbye: 'au revoir',
  thankYou: 'merci',
}

console.log('Simple translations:', simpleTranslations)

// Dictionnaire avec clés number et valeurs string
type NumberStringDict = {
  [key: number]: string
}

const statusMessages: NumberStringDict = {
  200: 'OK',
  404: 'Not Found',
  500: 'Server Error',
}

console.log('Status messages:', statusMessages)
console.log('Status 200:', statusMessages[200])

/**
 * ## 2. Record<K, V> (type utilitaire TypeScript)
 *
 * Record est un type utilitaire qui crée un objet avec des clés de type K et des valeurs de type V.
 * C'est une alternative plus concise à l'index signature.
 */

// Record<string, number> équivaut à { [key: string]: number }
type UserScores = Record<string, number>

const userScores: UserScores = {
  alice: 95,
  bob: 87,
  charlie: 92,
  diana: 89,
}

console.log('User scores:', userScores)
console.log('Score d\'Alice:', userScores.alice)

// Record avec des clés spécifiques (union de types littéraux)
type StatusCodes = Record<'ok' | 'error' | 'pending', number>

const statusCodes: StatusCodes = {
  ok: 200,
  error: 500,
  pending: 202,
}

console.log('Status codes:', statusCodes)

// Record avec clés number
type IdToName = Record<number, string>

const idToName: IdToName = {
  1: 'Alice',
  2: 'Bob',
  3: 'Charlie',
}

console.log('ID to name:', idToName)
console.log('Name for ID 1:', idToName[1])

/**
 * ## 3. Dictionnaire avec valeurs complexes
 *
 * Les valeurs peuvent être des objets, des tableaux, ou tout autre type.
 */

// Dictionnaire de strings vers objets
type UserDict = {
  [key: string]: {
    name: string
    age: number
    email: string
  }
}

const users: UserDict = {
  user1: {
    name: 'Alice',
    age: 30,
    email: 'alice@example.com',
  },
  user2: {
    name: 'Bob',
    age: 25,
    email: 'bob@example.com',
  },
}

console.log('Users:', users)
console.log('User 1:', users.user1)

// Dictionnaire de strings vers tableaux
type TagsDict = {
  [key: string]: string[]
}

const postTags: TagsDict = {
  post1: ['typescript', 'javascript', 'programming'],
  post2: ['react', 'frontend'],
  post3: ['nodejs', 'backend', 'server'],
}

console.log('Post tags:', postTags)
console.log('Tags du post1:', postTags.post1)

// Dictionnaire avec valeurs de différents types (union)
type FlexibleDict = {
  [key: string]: string | number | boolean
}

const config: FlexibleDict = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retry: true,
  maxRetries: 3,
}

console.log('Config:', config)

/**
 * ## 4. Dictionnaire avec propriétés spécifiques + index signature
 *
 * Combine des propriétés nommées avec des propriétés dynamiques.
 */

type UserWithMetadata = {
  id: number
  name: string
  [key: string]: unknown // Permet d'ajouter d'autres propriétés dynamiques
}

const userWithMeta: UserWithMetadata = {
  id: 1,
  name: 'Alice',
  role: 'admin',        // Propriété dynamique
  lastLogin: '2024-01-15', // Propriété dynamique
  preferences: { theme: 'dark' }, // Propriété dynamique
}

console.log('User with metadata:', userWithMeta)

/**
 * ## 5. Dictionnaire avec clés spécifiques (Map-like)
 *
 * Utilise un type union pour limiter les clés possibles.
 */

type ThemeColors = {
  [key in 'primary' | 'secondary' | 'accent']: string
}

const theme: ThemeColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  accent: '#28a745',
}

console.log('Theme colors:', theme)

// Avec Record (plus simple)
type ThemeColorsRecord = Record<'primary' | 'secondary' | 'accent', string>

const theme2: ThemeColorsRecord = {
  primary: '#007bff',
  secondary: '#6c757d',
  accent: '#28a745',
}

console.log('Theme 2:', theme2)

/**
 * ## 6. Dictionnaire partiel (toutes les clés optionnelles)
 */

type FullConfig = {
  apiUrl: string
  timeout: number
  retry: boolean
}

// Partial rend toutes les propriétés optionnelles
type PartialConfig = Partial<FullConfig>

const partialConfig: PartialConfig = {
  apiUrl: 'https://api.example.com',
  // timeout et retry sont optionnels
}

console.log('Partial config:', partialConfig)

/**
 * ## 7. Dictionnaire avec valeurs optionnelles
 */

type OptionalValuesDict = {
  [key: string]: string | undefined
}

const optionalDict: OptionalValuesDict = {
  key1: 'value1',
  key2: undefined,
  key3: 'value3',
}

console.log('Optional dict:', optionalDict)

// Ou avec Record
type OptionalRecord = Record<string, string | undefined>

const optionalRecord: OptionalRecord = {
  a: 'value a',
  b: undefined,
  c: 'value c',
}

console.log('Optional record:', optionalRecord)

/**
 * ## 8. Dictionnaire imbriqué (nested dictionary)
 */

type NestedDict = {
  [key: string]: {
    [key: string]: number
  }
}

const nestedScores: NestedDict = {
  alice: {
    math: 95,
    science: 87,
  },
  bob: {
    math: 88,
    science: 92,
  },
}

console.log('Nested scores:', nestedScores)
console.log('Alice math score:', nestedScores.alice?.math ?? 'N/A')

// Avec Record
type NestedRecord = Record<string, Record<string, number>>

const nestedRecord: NestedRecord = {
  user1: { score1: 100, score2: 90 },
  user2: { score1: 85, score2: 95 },
}

console.log('Nested record:', nestedRecord)

/**
 * ## 9. Dictionnaire avec type de clé personnalisé
 */

// Clés qui doivent suivre un pattern
type IdDict = {
  [key: `id_${string}`]: string // Template literal type
}

const idDict: IdDict = {
  id_user1: 'Alice',
  id_user2: 'Bob',
  id_user3: 'Charlie',
}

console.log('ID dict:', idDict)

/**
 * ## 10. Exemples pratiques
 */

// Exemple 1 : Cache simple
type Cache<T> = {
  [key: string]: T
}

const stringCache: Cache<string> = {
  user1: 'Alice',
  user2: 'Bob',
}

const numberCache: Cache<number> = {
  count1: 10,
  count2: 20,
}

console.log('String cache:', stringCache)
console.log('Number cache:', numberCache)

// Exemple 2 : Configuration par environnement
type EnvConfig = Record<string, string | number | boolean>

const devConfig: EnvConfig = {
  apiUrl: 'http://localhost:3000',
  debug: true,
  timeout: 5000,
}

const prodConfig: EnvConfig = {
  apiUrl: 'https://api.production.com',
  debug: false,
  timeout: 10000,
}

console.log('Dev config:', devConfig)
console.log('Prod config:', prodConfig)

// Exemple 3 : Traductions (i18n)
type Translations = Record<string, Record<string, string>>

const translations: Translations = {
  fr: {
    hello: 'Bonjour',
    goodbye: 'Au revoir',
    thankYou: 'Merci',
  },
  en: {
    hello: 'Hello',
    goodbye: 'Goodbye',
    thankYou: 'Thank you',
  },
  es: {
    hello: 'Hola',
    goodbye: 'Adiós',
    thankYou: 'Gracias',
  },
}

console.log('French hello:', translations.fr?.hello ?? 'N/A')
console.log('English hello:', translations.en?.hello ?? 'N/A')
console.log('Spanish hello:', translations.es?.hello ?? 'N/A')

// Exemple 4 : Compteurs par catégorie
type Counters = {
  [category: string]: number
}

const counters: Counters = {
  views: 1250,
  likes: 342,
  shares: 89,
  comments: 156,
}

console.log('Counters:', counters)

// Fonction pour incrémenter un compteur
function incrementCounter(counters: Counters, category: string): void {
  counters[category] = (counters[category] || 0) + 1
}

incrementCounter(counters, 'views')
incrementCounter(counters, 'newCategory')
console.log('Counters after increment:', counters)

/**
 * ## 11. Comparaison : Index Signature vs Record
 *
 * Les deux approches sont équivalentes pour les cas simples :
 *
 * ```typescript
 * // Index Signature
 * type Dict1 = { [key: string]: number }
 *
 * // Record
 * type Dict2 = Record<string, number>
 * ```
 *
 * **Quand utiliser Record :**
 * - Code plus concis et lisible
 * - Meilleure autocomplétion dans certains IDE
 * - Plus facile à comprendre pour les débutants
 *
 * **Quand utiliser Index Signature :**
 * - Besoin de combiner avec des propriétés nommées
 * - Besoin de contraintes plus complexes sur les clés
 * - Préférence personnelle
 */

/**
 * ## 12. Dictionnaire avec validation
 */

// Fonction pour vérifier si une clé existe
function hasKey<T extends Record<string, unknown>>(
  dict: T,
  key: string
): key is string & keyof T {
  return key in dict
}

const myDict: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
}

if (hasKey(myDict, 'a')) {
  console.log('Key "a" exists:', myDict.a)
}

// Fonction pour obtenir une valeur avec valeur par défaut
function getValue<T>(
  dict: Record<string, T>,
  key: string,
  defaultValue: T
): T {
  return dict[key] ?? defaultValue
}

const value = getValue(myDict, 'x', 0)
console.log('Value for key "x":', value)

/**
 * ## Résumé
 *
 * ### Méthodes principales :
 * 1. **Index Signature** : `{ [key: string]: number }`
 * 2. **Record<K, V>** : `Record<string, number>`
 *
 * ### Cas d'usage :
 * - **Record** : Pour la plupart des cas (plus simple)
 * - **Index Signature** : Quand vous avez besoin de combiner avec des propriétés nommées
 *
 * ### Exemples courants :
 * - Cache de données
 * - Configuration par clé
 * - Traductions (i18n)
 * - Compteurs par catégorie
 * - Mapping ID → valeur
 */

