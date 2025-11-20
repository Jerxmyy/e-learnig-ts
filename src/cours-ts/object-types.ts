/**
 * Comment typer un objet simple en TypeScript
 *
 * Il existe plusieurs façons de typer un objet en TypeScript.
 * Voici les différentes approches avec leurs avantages et cas d'usage.
 */

/**
 * ## 1. Type inline (définition directe)
 *
 * La façon la plus simple : définir le type directement dans la déclaration.
 */

// Objet simple avec type inline
const user1: { name: string; age: number; email: string } = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
}

console.log('User 1:', user1)

// Objet avec propriétés optionnelles
const user2: {
  name: string
  age: number
  email?: string // Le "?" rend la propriété optionnelle
} = {
  name: 'Bob',
  age: 25,
  // email est optionnel, donc on peut l'omettre
}

console.log('User 2:', user2)

// Objet avec propriétés en lecture seule
const config: {
  readonly apiUrl: string
  readonly timeout: number
} = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
}

// config.apiUrl = 'autre url' // ❌ Erreur : propriété en lecture seule
console.log('Config:', config)

/**
 * ## 2. Interface (recommandé pour les objets)
 *
 * Les interfaces sont idéales pour définir la structure d'objets.
 * Elles peuvent être étendues et sont plus flexibles que les types.
 */

interface User {
  name: string
  age: number
  email: string
}

const user3: User = {
  name: 'Charlie',
  age: 28,
  email: 'charlie@example.com',
}

console.log('User 3:', user3)

// Interface avec propriétés optionnelles
interface Product {
  id: number
  name: string
  price: number
  description?: string // Optionnel
  inStock?: boolean   // Optionnel
}

const product1: Product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  description: 'Un ordinateur portable puissant',
}

const product2: Product = {
  id: 2,
  name: 'Mouse',
  price: 29.99,
  // description et inStock sont optionnels
}

console.log('Product 1:', product1)
console.log('Product 2:', product2)

// Interface avec propriétés en lecture seule
interface Point {
  readonly x: number
  readonly y: number
}

const point: Point = { x: 10, y: 20 }
// point.x = 30 // ❌ Erreur : propriété en lecture seule
console.log('Point:', point)

/**
 * ## 3. Type alias (alternative aux interfaces)
 *
 * Les types sont plus flexibles et peuvent représenter des unions, intersections, etc.
 */

type Person = {
  firstName: string
  lastName: string
  age: number
}

const person1: Person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 35,
}

console.log('Person:', person1)

// Type avec union (plusieurs types possibles)
type ID = string | number

type Customer = {
  id: ID
  name: string
}

const customer1: Customer = { id: 'CUST-001', name: 'Alice' }
const customer2: Customer = { id: 12345, name: 'Bob' }

console.log('Customer 1:', customer1)
console.log('Customer 2:', customer2)

/**
 * ## 4. Objet avec index signature
 *
 * Permet d'avoir des propriétés dynamiques avec un type de clé et de valeur.
 */

// Objet avec clés string et valeurs number
type StringNumberMap = {
  [key: string]: number
}

const scores: StringNumberMap = {
  math: 95,
  science: 87,
  history: 92,
}

console.log('Scores:', scores)

// Objet avec clés string et valeurs de différents types
type FlexibleObject = {
  [key: string]: string | number | boolean
}

const data: FlexibleObject = {
  name: 'Test',
  count: 42,
  active: true,
}

console.log('Data:', data)

/**
 * ## 5. Objet avec propriétés spécifiques + index signature
 *
 * Combine des propriétés nommées avec des propriétés dynamiques.
 */

type UserWithMetadata = {
  id: number
  name: string
  [key: string]: unknown // Permet d'ajouter d'autres propriétés
}

const userWithMeta: UserWithMetadata = {
  id: 1,
  name: 'Alice',
  role: 'admin',      // Propriété dynamique
  lastLogin: '2024-01-15', // Propriété dynamique
}

console.log('User with metadata:', userWithMeta)

/**
 * ## 6. Objet imbriqué (nested objects)
 */

interface Address {
  street: string
  city: string
  zipCode: string
  country: string
}

interface Employee {
  id: number
  name: string
  address: Address // Objet imbriqué
}

const employee: Employee = {
  id: 1,
  name: 'Jane Smith',
  address: {
    street: '123 Main St',
    city: 'Paris',
    zipCode: '75001',
    country: 'France',
  },
}

console.log('Employee:', employee)
console.log('Employee city:', employee.address.city)

/**
 * ## 7. Objet avec tableau
 */

interface BlogPost {
  id: number
  title: string
  content: string
  tags: string[] // Tableau de strings
  comments: Array<{ author: string; text: string }> // Tableau d'objets
}

const post: BlogPost = {
  id: 1,
  title: 'Introduction à TypeScript',
  content: 'TypeScript est un langage...',
  tags: ['typescript', 'programming', 'javascript'],
  comments: [
    { author: 'Alice', text: 'Excellent article!' },
    { author: 'Bob', text: 'Très utile, merci!' },
  ],
}

console.log('Blog post:', post)
console.log('Tags:', post.tags)
console.log('Comments:', post.comments)

/**
 * ## 8. Objet avec méthodes (fonctions)
 */

interface Calculator {
  value: number
  add: (n: number) => void
  subtract: (n: number) => void
  getValue: () => number
}

const calculator: Calculator = {
  value: 0,
  add(n: number) {
    this.value += n
  },
  subtract(n: number) {
    this.value -= n
  },
  getValue() {
    return this.value
  },
}

calculator.add(10)
calculator.subtract(3)
console.log('Calculator value:', calculator.getValue())

/**
 * ## 9. Type Record (utilitaire TypeScript)
 *
 * Record<K, V> est un type utilitaire pour créer un objet avec des clés de type K et des valeurs de type V.
 */

// Record<string, number> équivaut à { [key: string]: number }
type UserScores = Record<string, number>

const userScores: UserScores = {
  alice: 95,
  bob: 87,
  charlie: 92,
}

console.log('User scores:', userScores)

// Record avec des clés spécifiques
type StatusCodes = Record<'ok' | 'error' | 'pending', number>

const statusCodes: StatusCodes = {
  ok: 200,
  error: 500,
  pending: 202,
}

console.log('Status codes:', statusCodes)

/**
 * ## 10. Objet partiel (Partial<T>)
 *
 * Rend toutes les propriétés optionnelles.
 */

interface FullUser {
  id: number
  name: string
  email: string
  age: number
}

// Partial<FullUser> rend toutes les propriétés optionnelles
const partialUser: Partial<FullUser> = {
  name: 'Alice',
  // Les autres propriétés sont optionnelles
}

console.log('Partial user:', partialUser)

/**
 * ## 11. Objet requis (Required<T>)
 *
 * Rend toutes les propriétés obligatoires (même celles marquées optionnelles).
 */

interface OptionalUser {
  id?: number
  name?: string
  email?: string
}

// Required<OptionalUser> rend toutes les propriétés obligatoires
const requiredUser: Required<OptionalUser> = {
  id: 1,
  name: 'Bob',
  email: 'bob@example.com',
  // Toutes les propriétés sont maintenant obligatoires
}

console.log('Required user:', requiredUser)

/**
 * ## 12. Exemple pratique complet
 */

interface UserProfile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  age: number
  isActive: boolean
  preferences: {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
  }
  addresses: Address[]
  metadata?: Record<string, unknown>
}

const userProfile: UserProfile = {
  id: 1,
  username: 'alice123',
  email: 'alice@example.com',
  firstName: 'Alice',
  lastName: 'Smith',
  age: 30,
  isActive: true,
  preferences: {
    theme: 'dark',
    language: 'fr',
    notifications: true,
  },
  addresses: [
    {
      street: '123 Main St',
      city: 'Paris',
      zipCode: '75001',
      country: 'France',
    },
  ],
  metadata: {
    lastLogin: '2024-01-15',
    loginCount: 42,
  },
}

console.log('User profile:', userProfile)

/**
 * ## Résumé des approches
 *
 * | Approche | Quand l'utiliser | Avantages |
 * |----------|------------------|-----------|
 * | **Type inline** | Objets simples, usage unique | Rapide, pas besoin de déclaration séparée |
 * | **Interface** | Objets réutilisables, extensibles | Extensible, meilleure autocomplétion |
 * | **Type alias** | Besoin de unions/intersections | Plus flexible, peut combiner des types |
 * | **Index signature** | Propriétés dynamiques | Permet des clés/valeurs variables |
 * | **Record<K, V>** | Objets avec structure clé-valeur | Type utilitaire pratique |
 *
 * ## Bonnes pratiques
 *
 * 1. **Utilisez `interface` pour les objets** - C'est la convention TypeScript
 * 2. **Utilisez `type` pour les unions, intersections, et types complexes**
 * 3. **Préférez les propriétés optionnelles (`?`) plutôt que `undefined`**
 * 4. **Utilisez `readonly` pour les propriétés immuables**
 * 5. **Nommez vos types/interfaces avec une majuscule** (PascalCase)
 */

