/**
 * Types Utilitaires en TypeScript : Partial et Record
 *
 * Les types utilitaires (utility types) sont des types prédéfinis par TypeScript
 * qui permettent de transformer des types existants de manière pratique.
 * Ce fichier explique en détail Partial et Record.
 */

/**
 * ## 1. Partial<T> - Rend toutes les propriétés optionnelles
 *
 * Partial prend un type T et rend TOUTES ses propriétés optionnelles.
 * C'est très utile pour les mises à jour partielles d'objets.
 */

// Exemple de base
interface User {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
}

// Sans Partial : toutes les propriétés sont obligatoires
const fullUser: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  isActive: true,
}

console.log('Full user:', fullUser)

// Avec Partial : toutes les propriétés deviennent optionnelles
const partialUser: Partial<User> = {
  name: 'Bob',
  email: 'bob@example.com',
  // id, age, isActive sont maintenant optionnels
}

console.log('Partial user:', partialUser)

// Cas d'usage pratique : fonction de mise à jour
function updateUser(id: number, updates: Partial<User>): User {
  // Dans une vraie application, on récupérerait l'utilisateur depuis la DB
  const existingUser: User = {
    id,
    name: 'Existing User',
    email: 'existing@example.com',
    age: 25,
    isActive: true,
  }

  // Fusionne les propriétés existantes avec les mises à jour
  return { ...existingUser, ...updates }
}

const updatedUser = updateUser(1, {
  name: 'Alice Updated',
  age: 31,
  // On peut mettre à jour seulement certaines propriétés
})

console.log('Updated user:', updatedUser)

// Exemple avec des paramètres de fonction
interface CreateUserParams {
  name: string
  email: string
  age: number
  password: string
}

interface UpdateUserParams extends Partial<CreateUserParams> {
  id: number
  // Toutes les propriétés de CreateUserParams sont optionnelles
}

function updateUserParams(params: UpdateUserParams): void {
  console.log('Updating user:', params)
  // On peut mettre à jour seulement les champs fournis
}

updateUserParams({
  id: 1,
  name: 'New Name',
  // email, age, password sont optionnels
})

/**
 * ## 2. Record<K, V> - Crée un type d'objet avec des clés K et des valeurs V
 *
 * Record est un type utilitaire qui crée un type d'objet où :
 * - K est le type des clés (généralement string | number)
 * - V est le type des valeurs
 *
 * Syntaxe : Record<Keys, Value>
 */

// Exemple de base : Record<string, number>
type StringNumberRecord = Record<string, number>

const scores: StringNumberRecord = {
  math: 95,
  science: 87,
  history: 92,
  english: 88,
}

console.log('Scores:', scores)
console.log('Math score:', scores.math)

// Équivalent à :
type StringNumberDict = {
  [key: string]: number
}

const scores2: StringNumberDict = {
  math: 95,
  science: 87,
}

console.log('Scores 2:', scores2)

// Record avec des clés spécifiques (union de types littéraux)
type StatusCodes = Record<'ok' | 'error' | 'pending', number>

const statusCodes: StatusCodes = {
  ok: 200,
  error: 500,
  pending: 202,
  // On ne peut pas ajouter d'autres clés
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

// Record avec valeurs complexes
type UserRecord = Record<string, User>

const users: UserRecord = {
  user1: {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    age: 30,
    isActive: true,
  },
  user2: {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    age: 25,
    isActive: false,
  },
}

console.log('Users record:', users)

/**
 * ## 3. Comparaison : Partial vs Record
 *
 * - Partial<T> : Transforme un type en rendant ses propriétés optionnelles
 * - Record<K, V> : Crée un type d'objet avec des clés K et des valeurs V
 */

// Partial transforme un type existant
type PartialUser = Partial<User>
// Équivalent à :
// {
//   id?: number
//   name?: string
//   email?: string
//   age?: number
//   isActive?: boolean
// }

// Exemple d'utilisation de PartialUser
const partialUserExample: PartialUser = { name: 'Test' }
console.log('PartialUser example:', partialUserExample)

// Record crée un nouveau type d'objet
type UserMap = Record<string, User>
// Équivalent à :
// {
//   [key: string]: User
// }

// Exemple d'utilisation de UserMap
const userMapExample: UserMap = {
  user1: { id: 1, name: 'Alice', email: 'alice@example.com', age: 30, isActive: true },
}
console.log('UserMap example:', userMapExample)

/**
 * ## 4. Cas d'usage pratiques de Partial
 */

// Cas 1 : Formulaires avec validation partielle
interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
}

function validateForm(data: Partial<FormData>): string[] {
  const errors: string[] = []

  if (!data.firstName) errors.push('First name is required')
  if (!data.lastName) errors.push('Last name is required')
  if (!data.email) errors.push('Email is required')
  // phone et address sont optionnels dans ce cas

  return errors
}

const formErrors = validateForm({
  firstName: 'John',
  // lastName manquant
  email: 'john@example.com',
})

console.log('Form errors:', formErrors)

// Cas 2 : Configuration avec valeurs par défaut
interface AppConfig {
  apiUrl: string
  timeout: number
  retries: number
  debug: boolean
}

const defaultConfig: AppConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  debug: false,
}

function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return { ...defaultConfig, ...overrides }
}

const customConfig = createConfig({
  timeout: 10000,
  debug: true,
  // apiUrl et retries utilisent les valeurs par défaut
})

console.log('Custom config:', customConfig)

// Cas 3 : Mise à jour de base de données
interface DatabaseUser {
  id: number
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

function updateDatabaseUser(
  id: number,
  updates: Partial<Omit<DatabaseUser, 'id' | 'createdAt'>> // Exclut id et createdAt
): DatabaseUser {
  // Dans une vraie app, on ferait une requête SQL UPDATE
  return {
    id,
    name: updates.name || 'Unknown',
    email: updates.email || 'unknown@example.com',
    role: updates.role || 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

// Exemple d'utilisation de updateDatabaseUser
const updatedDatabaseUser = updateDatabaseUser(1, { name: 'Updated Name', email: 'updated@example.com' })
console.log('Updated database user:', updatedDatabaseUser)

/**
 * ## 5. Cas d'usage pratiques de Record
 */

// Cas 1 : Cache simple
type Cache<T> = Record<string, T>

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

// Cas 2 : Configuration par environnement
type EnvConfig = Record<string, string | number | boolean>

const devConfig: EnvConfig = {
  apiUrl: 'http://localhost:3000',
  debug: true,
  timeout: 5000,
  maxRetries: 3,
}

const prodConfig: EnvConfig = {
  apiUrl: 'https://api.production.com',
  debug: false,
  timeout: 10000,
  maxRetries: 5,
}

console.log('Dev config:', devConfig)
console.log('Prod config:', prodConfig)

// Cas 3 : Traductions (i18n)
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

// Vérification de type pour éviter les erreurs "possibly undefined"
if (translations.fr && translations.en) {
  console.log('French hello:', translations.fr.hello)
  console.log('English hello:', translations.en.hello)
}

// Cas 4 : Mapping de statuts
type StatusMap = Record<'pending' | 'approved' | 'rejected', string>

const statusMessages: StatusMap = {
  pending: 'En attente de validation',
  approved: 'Approuvé',
  rejected: 'Rejeté',
}

console.log('Status messages:', statusMessages)

// Cas 5 : Compteurs par catégorie
type Counters = Record<string, number>

const counters: Counters = {
  views: 1250,
  likes: 342,
  shares: 89,
  comments: 156,
}

function incrementCounter(counters: Counters, category: string): void {
  counters[category] = (counters[category] || 0) + 1
}

incrementCounter(counters, 'views')
incrementCounter(counters, 'newCategory')
console.log('Counters:', counters)

/**
 * ## 6. Combinaison de Partial et Record
 */

// Record avec valeurs Partial
type UserUpdates = Record<string, Partial<User>>

const userUpdates: UserUpdates = {
  user1: { name: 'Alice Updated', age: 31 },
  user2: { email: 'newemail@example.com' },
}

console.log('User updates:', userUpdates)

// Partial avec Record
type PartialConfig = Partial<Record<'apiUrl' | 'timeout' | 'retries', string | number>>

const partialConfig: PartialConfig = {
  apiUrl: 'https://api.example.com',
  // timeout et retries sont optionnels
}

console.log('Partial config:', partialConfig)

/**
 * ## 7. Autres types utilitaires liés
 */

// Required<T> - Rend toutes les propriétés obligatoires (opposé de Partial)
interface OptionalUser {
  id?: number
  name?: string
  email?: string
}

type RequiredUser = Required<OptionalUser>
// Équivalent à :
// {
//   id: number
//   name: string
//   email: string
// }

const requiredUser: RequiredUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  // Toutes les propriétés sont obligatoires
}

console.log('Required user:', requiredUser)

// Pick<T, K> - Sélectionne certaines propriétés
type UserName = Pick<User, 'name' | 'email'>

const userName: UserName = {
  name: 'Alice',
  email: 'alice@example.com',
  // Seulement name et email
}

console.log('User name:', userName)

// Omit<T, K> - Exclut certaines propriétés
type UserWithoutId = Omit<User, 'id'>

const userWithoutId: UserWithoutId = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  isActive: true,
  // id est exclu
}

console.log('User without id:', userWithoutId)

/**
 * ## 8. Exemple complet : Système de gestion d'utilisateurs
 */

interface UserProfile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  age: number
  role: 'admin' | 'user' | 'guest'
  preferences: {
    theme: 'light' | 'dark'
    language: string
  }
}

// Cache des utilisateurs (Record)
type UserCache = Record<number, UserProfile>

const userCache: UserCache = {
  1: {
    id: 1,
    username: 'alice',
    email: 'alice@example.com',
    firstName: 'Alice',
    lastName: 'Smith',
    age: 30,
    role: 'admin',
    preferences: { theme: 'dark', language: 'fr' },
  },
  2: {
    id: 2,
    username: 'bob',
    email: 'bob@example.com',
    firstName: 'Bob',
    lastName: 'Jones',
    age: 25,
    role: 'user',
    preferences: { theme: 'light', language: 'en' },
  },
}

console.log('User cache:', userCache)

// Fonction de mise à jour (Partial)
function updateUserProfile(
  id: number,
  updates: Partial<Omit<UserProfile, 'id'>> // Exclut id
): UserProfile | null {
  const user = userCache[id]
  if (!user) return null

  return {
    ...user,
    ...updates,
  }
}

const updatedProfile = updateUserProfile(1, {
  age: 31,
  preferences: { theme: 'light', language: 'en' },
})

console.log('Updated profile:', updatedProfile)

// Statistiques par rôle (Record)
type RoleStats = Record<'admin' | 'user' | 'guest', number>

function getRoleStats(users: UserCache): RoleStats {
  const stats: RoleStats = {
    admin: 0,
    user: 0,
    guest: 0,
  }

  Object.values(users).forEach((user) => {
    stats[user.role]++
  })

  return stats
}

const stats = getRoleStats(userCache)
console.log('Role stats:', stats)

/**
 * ## Résumé
 *
 * ### Partial<T>
 * - **Usage** : Rend toutes les propriétés d'un type optionnelles
 * - **Cas d'usage** : Mises à jour partielles, formulaires, configurations avec valeurs par défaut
 * - **Exemple** : `Partial<User>` rend toutes les propriétés de User optionnelles
 *
 * ### Record<K, V>
 * - **Usage** : Crée un type d'objet avec des clés K et des valeurs V
 * - **Cas d'usage** : Dictionnaires, caches, configurations dynamiques, traductions
 * - **Exemple** : `Record<string, number>` équivaut à `{ [key: string]: number }`
 *
 * ### Quand utiliser quoi ?
 * - **Partial** : Quand vous voulez rendre des propriétés optionnelles (mises à jour, formulaires)
 * - **Record** : Quand vous voulez créer un dictionnaire/map avec un type de clé et de valeur spécifique
 * - **Les combiner** : Très puissant pour des cas complexes (ex: `Record<string, Partial<User>>`)
 */

