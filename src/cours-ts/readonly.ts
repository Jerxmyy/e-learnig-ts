/**
 * Le mot-clé `readonly` en TypeScript
 *
 * `readonly` permet de rendre des propriétés, tableaux ou objets immuables (non modifiables).
 * C'est un outil important pour garantir l'immutabilité et éviter les modifications accidentelles.
 */

/**
 * ## 1. Readonly sur les propriétés d'interface/type
 *
 * Rend une propriété en lecture seule. Elle ne peut être modifiée qu'à l'initialisation.
 */

interface User {
  readonly id: number
  name: string
  email: string
  readonly createdAt: Date
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date(),
}

// user.id = 2 // ❌ Erreur : Cannot assign to 'id' because it is a read-only property
// user.name = 'Bob' // ✅ OK : name n'est pas readonly
// user.createdAt = new Date() // ❌ Erreur : Cannot assign to 'createdAt' because it is a read-only property

console.log('User:', user)

// Les propriétés readonly peuvent être assignées à l'initialisation
const newUser: User = {
  id: 2,
  name: 'Bob',
  email: 'bob@example.com',
  createdAt: new Date(),
}

console.log('New user:', newUser)

/**
 * ## 2. Readonly sur les tableaux
 *
 * Rend un tableau en lecture seule. Les éléments ne peuvent pas être modifiés, ajoutés ou supprimés.
 */

// Tableau readonly
const readonlyNumbers: readonly number[] = [1, 2, 3, 4, 5]

// readonlyNumbers.push(6) // ❌ Erreur : Property 'push' does not exist on type 'readonly number[]'
// readonlyNumbers[0] = 10 // ❌ Erreur : Index signature in type 'readonly number[]' only permits reading
// readonlyNumbers.pop() // ❌ Erreur : Property 'pop' does not exist on type 'readonly number[]'

console.log('Readonly numbers:', readonlyNumbers)
console.log('First number:', readonlyNumbers[0]) // ✅ OK : lecture autorisée

// Syntaxe alternative avec ReadonlyArray
const readonlyArray: ReadonlyArray<string> = ['a', 'b', 'c']

// readonlyArray.push('d') // ❌ Erreur
console.log('Readonly array:', readonlyArray)

// Syntaxe avec Readonly<T[]>
type ReadonlyStringArray = Readonly<string[]>

const readonlyStrings: ReadonlyStringArray = ['hello', 'world']
// readonlyStrings.push('test') // ❌ Erreur

console.log('Readonly strings:', readonlyStrings)

/**
 * ## 3. ReadonlyArray<T> - Type utilitaire
 *
 * ReadonlyArray est un type utilitaire qui crée un tableau en lecture seule.
 */

const numbers: ReadonlyArray<number> = [1, 2, 3, 4, 5]

// numbers.push(6) // ❌ Erreur
// numbers[0] = 10 // ❌ Erreur
// numbers.length = 0 // ❌ Erreur

console.log('Numbers:', numbers)
console.log('Length:', numbers.length) // ✅ OK : lecture autorisée

// Comparaison avec un tableau normal
const mutableNumbers: number[] = [1, 2, 3]
mutableNumbers.push(4) // ✅ OK
mutableNumbers[0] = 10 // ✅ OK
console.log('Mutable numbers:', mutableNumbers)

/**
 * ## 4. Readonly<T> - Type utilitaire
 *
 * Readonly<T> rend toutes les propriétés d'un type en lecture seule.
 */

interface Config {
  apiUrl: string
  timeout: number
  retries: number
}

// Sans Readonly
const mutableConfig: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
}

mutableConfig.timeout = 10000 // ✅ OK
console.log('Mutable config:', mutableConfig)

// Avec Readonly
const readonlyConfig: Readonly<Config> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
}

// readonlyConfig.timeout = 10000 // ❌ Erreur : Cannot assign to 'timeout' because it is a read-only property
// readonlyConfig.apiUrl = 'new url' // ❌ Erreur

console.log('Readonly config:', readonlyConfig)

// Readonly avec type personnalisé
interface UserProfile {
  id: number
  name: string
  email: string
  preferences: {
    theme: 'light' | 'dark'
    language: string
  }
}

type ReadonlyUserProfile = Readonly<UserProfile>

const readonlyProfile: ReadonlyUserProfile = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  preferences: {
    theme: 'dark',
    language: 'fr',
  },
}

// readonlyProfile.name = 'Bob' // ❌ Erreur
// readonlyProfile.preferences.theme = 'light' // ⚠️ Attention : Readonly est shallow (superficiel)

// Readonly est "shallow" (superficiel) - il ne s'applique qu'au premier niveau
readonlyProfile.preferences.theme = 'light' // ✅ OK : les objets imbriqués ne sont pas readonly
console.log('Readonly profile:', readonlyProfile)

/**
 * ## 5. Readonly profond (Deep Readonly)
 *
 * Readonly<T> est "shallow" (superficiel). Pour un readonly profond, il faut créer un type personnalisé.
 */

// Type DeepReadonly personnalisé
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface NestedConfig {
  api: {
    url: string
    timeout: number
  }
  database: {
    host: string
    port: number
  }
}

type DeepReadonlyConfig = DeepReadonly<NestedConfig>

const deepReadonlyConfig: DeepReadonlyConfig = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000,
  },
  database: {
    host: 'localhost',
    port: 5432,
  },
}

// deepReadonlyConfig.api.url = 'new url' // ❌ Erreur avec DeepReadonly
// deepReadonlyConfig.database.port = 3306 // ❌ Erreur avec DeepReadonly

console.log('Deep readonly config:', deepReadonlyConfig)

/**
 * ## 6. Readonly avec as const
 *
 * `as const` crée des types littéraux readonly et rend les objets/tableaux profondément readonly.
 */

// Tableau avec as const
const sizes = ['small', 'medium', 'large'] as const
// sizes.push('xlarge') // ❌ Erreur
// sizes[0] = 'tiny' // ❌ Erreur

console.log('Sizes:', sizes)

// Objet avec as const
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} as const

// config.timeout = 10000 // ❌ Erreur
// config.apiUrl = 'new url' // ❌ Erreur

console.log('Config as const:', config)

// Objet imbriqué avec as const (readonly profond)
const appConfigAsConst = {
  api: {
    url: 'https://api.example.com',
    timeout: 5000,
  },
  database: {
    host: 'localhost',
    port: 5432,
  },
} as const

// appConfigAsConst.api.url = 'new url' // ❌ Erreur
// appConfigAsConst.database.port = 3306 // ❌ Erreur

console.log('App config as const:', appConfigAsConst)

/**
 * ## 7. Cas d'usage pratiques
 */

// Cas 1 : Configuration immuable
interface AppSettings {
  readonly version: string
  readonly environment: 'development' | 'production'
  readonly features: {
    readonly analytics: boolean
    readonly logging: boolean
  }
}

const settings: AppSettings = {
  version: '1.0.0',
  environment: 'production',
  features: {
    analytics: true,
    logging: false,
  },
}

// settings.version = '2.0.0' // ❌ Erreur
// settings.features.analytics = false // ⚠️ OK car readonly est shallow

console.log('Settings:', settings)

// Cas 2 : Constantes globales
interface Constants {
  readonly MAX_RETRIES: number
  readonly TIMEOUT: number
  readonly API_ENDPOINTS: readonly string[]
}

const constants: Constants = {
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
  API_ENDPOINTS: ['/users', '/posts', '/comments'] as const,
}

// constants.MAX_RETRIES = 5 // ❌ Erreur
// constants.API_ENDPOINTS.push('/new') // ❌ Erreur

console.log('Constants:', constants)

// Cas 3 : Données de référence (lookup tables)
type StatusMessages = Readonly<Record<'pending' | 'approved' | 'rejected', string>>

const statusMessages: StatusMessages = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
}

// statusMessages.pending = 'New message' // ❌ Erreur

console.log('Status messages:', statusMessages)

// Cas 4 : Paramètres de fonction readonly
function processData(data: ReadonlyArray<number>): number {
  // data.push(100) // ❌ Erreur : ne peut pas modifier le tableau
  return data.reduce((sum, val) => sum + val, 0)
}

const numbers2 = [1, 2, 3, 4, 5]
const sum = processData(numbers2)
console.log('Sum:', sum)

// Cas 5 : Objets de configuration avec readonly
type ReadonlyConfig = Readonly<{
  apiUrl: string
  timeout: number
  headers: Readonly<Record<string, string>>
}>

const apiConfig: ReadonlyConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
  } as const,
}

// apiConfig.timeout = 10000 // ❌ Erreur
// apiConfig.headers['Content-Type'] = 'text/plain' // ⚠️ OK car headers n'est pas profondément readonly

console.log('API config:', apiConfig)

/**
 * ## 8. Readonly vs const
 *
 * - `const` : empêche la réassignation de la variable
 * - `readonly` : empêche la modification des propriétés
 */

// const empêche la réassignation
const myArray = [1, 2, 3]
// myArray = [4, 5, 6] // ❌ Erreur : Cannot assign to 'myArray' because it is a constant
myArray.push(4) // ✅ OK : on peut modifier le contenu

// readonly empêche la modification
const readonlyArray2: readonly number[] = [1, 2, 3]
// readonlyArray2 = [4, 5, 6] // ❌ Erreur : Cannot assign to 'readonlyArray2' because it is a constant
// readonlyArray2.push(4) // ❌ Erreur : Cannot modify readonly array

console.log('My array:', myArray)
console.log('Readonly array 2:', readonlyArray2)

// Combinaison : const + readonly
const readonlyConstArray: readonly number[] = [1, 2, 3] as const
// readonlyConstArray = [4, 5, 6] // ❌ Erreur : const
// readonlyConstArray.push(4) // ❌ Erreur : readonly
// readonlyConstArray[0] = 10 // ❌ Erreur : as const

console.log('Readonly const array:', readonlyConstArray)

/**
 * ## 9. Readonly avec génériques
 */

// Fonction qui accepte un objet readonly
function processReadonlyData<T extends Readonly<Record<string, unknown>>>(
  data: T
): void {
  // data.newKey = 'value' // ❌ Erreur : ne peut pas modifier
  console.log('Processing data:', data)
}

const myData = {
  name: 'Alice',
  age: 30,
} as const

processReadonlyData(myData)

// Type utilitaire pour créer un readonly partiel
type ReadonlyPartial<T> = Readonly<Partial<T>>

interface UserExample {
  id: number
  name: string
  email: string
}

type ReadonlyPartialUser = ReadonlyPartial<UserExample>

const partialUser: ReadonlyPartialUser = {
  name: 'Alice',
  // id et email sont optionnels ET readonly
}

// partialUser.name = 'Bob' // ❌ Erreur : readonly
console.log('Readonly partial user:', partialUser)

/**
 * ## 10. Exemple complet : Système de configuration
 */

interface DatabaseConfig {
  readonly host: string
  readonly port: number
  readonly database: string
  readonly credentials: {
    readonly username: string
    readonly password: string
  }
}

interface AppConfiguration {
  readonly appName: string
  readonly version: string
  readonly database: Readonly<DatabaseConfig>
  readonly features: ReadonlyArray<string>
}

const appConfig: AppConfiguration = {
  appName: 'My App',
  version: '1.0.0',
  database: {
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    credentials: {
      username: 'admin',
      password: 'secret',
    },
  },
  features: ['feature1', 'feature2', 'feature3'] as const,
}

// appConfig.version = '2.0.0' // ❌ Erreur
// appConfig.database.host = 'new host' // ⚠️ OK car readonly est shallow
// appConfig.features.push('feature4') // ❌ Erreur

console.log('App configuration:', appConfig)

/**
 * ## Résumé
 *
 * ### `readonly` sur propriétés
 * - Rend une propriété en lecture seule
 * - Peut être assignée à l'initialisation
 * - Syntaxe : `readonly property: type`
 *
 * ### `readonly` sur tableaux
 * - `readonly number[]` ou `ReadonlyArray<number>`
 * - Empêche push, pop, splice, etc.
 * - Permet toujours la lecture
 *
 * ### `Readonly<T>` type utilitaire
 * - Rend toutes les propriétés d'un type readonly
 * - **Shallow** (superficiel) : ne s'applique qu'au premier niveau
 * - Syntaxe : `Readonly<MyType>`
 *
 * ### `as const`
 * - Crée des types littéraux readonly
 * - Rend les objets/tableaux profondément readonly
 * - Syntaxe : `const obj = { ... } as const`
 *
 * ### Quand utiliser readonly ?
 * - **Configurations** : Pour éviter les modifications accidentelles
 * - **Constantes** : Pour des valeurs qui ne doivent jamais changer
 * - **Paramètres de fonction** : Pour garantir qu'une fonction ne modifie pas ses paramètres
 * - **Données de référence** : Pour des lookup tables immuables
 * - **État immuable** : Pour des patterns fonctionnels
 *
 * ### Différence avec const
 * - `const` : Empêche la réassignation de la variable
 * - `readonly` : Empêche la modification des propriétés/contenu
 * - Utilisez les deux ensemble pour une immutabilité maximale
 */

