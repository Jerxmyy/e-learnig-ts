/**
 * Types Utilitaires : Pick et Omit en TypeScript
 *
 * Pick<T, K> et Omit<T, K> sont des types utilitaires qui permettent de
 * créer de nouveaux types en sélectionnant ou excluant des propriétés d'un type existant.
 */

/**
 * ## 1. Pick<T, K> - Sélectionne certaines propriétés
 *
 * Pick prend un type T et un ensemble de clés K, puis crée un nouveau type
 * contenant uniquement les propriétés spécifiées par K.
 *
 * Syntaxe : Pick<Type, 'key1' | 'key2' | ...>
 */

interface User {
  id: number
  name: string
  email: string
  age: number
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
  updatedAt: Date
}

// Pick sélectionne seulement certaines propriétés
type UserBasic = Pick<User, 'id' | 'name' | 'email'>

const userBasic: UserBasic = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  // age, role, createdAt, updatedAt ne sont pas inclus
}

console.log('User basic:', userBasic)

// Pick avec une seule propriété
type UserIdOnly = Pick<User, 'id'>

const userIdOnly: UserIdOnly = {
  id: 1,
}

console.log('User ID:', userIdOnly)

// Pick avec plusieurs propriétés
type UserProfile = Pick<User, 'id' | 'name' | 'email' | 'age'>

const userProfile: UserProfile = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
}

console.log('User profile:', userProfile)

/**
 * ## 2. Omit<T, K> - Exclut certaines propriétés
 *
 * Omit prend un type T et un ensemble de clés K, puis crée un nouveau type
 * contenant toutes les propriétés de T SAUF celles spécifiées par K.
 *
 * Syntaxe : Omit<Type, 'key1' | 'key2' | ...>
 */

// Omit exclut certaines propriétés
type UserWithoutTimestamps = Omit<User, 'createdAt' | 'updatedAt'>

const userWithoutTimestamps: UserWithoutTimestamps = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  role: 'admin',
  // createdAt et updatedAt sont exclus
}

console.log('User without timestamps:', userWithoutTimestamps)

// Omit avec une seule propriété
type UserWithoutId = Omit<User, 'id'>

const userWithoutId: UserWithoutId = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
  // id est exclu
}

console.log('User without ID:', userWithoutId)

// Omit pour créer un type de création (sans id et timestamps)
type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

const newUser: CreateUserInput = {
  name: 'Bob',
  email: 'bob@example.com',
  age: 25,
  role: 'user',
  // id, createdAt, updatedAt sont exclus
}

console.log('Create user input:', newUser)

/**
 * ## 3. Comparaison : Pick vs Omit
 *
 * Pick sélectionne des propriétés, Omit les exclut.
 * Ils sont complémentaires.
 */

// Avec Pick : on sélectionne ce qu'on veut
type UserNameAndEmail = Pick<User, 'name' | 'email'>

// Avec Omit : on exclut ce qu'on ne veut pas
type UserNameAndEmail2 = Omit<User, 'id' | 'age' | 'role' | 'createdAt' | 'updatedAt'>

// Les deux sont équivalents dans ce cas
const user1: UserNameAndEmail = { name: 'Alice', email: 'alice@example.com' }
const user2: UserNameAndEmail2 = { name: 'Alice', email: 'alice@example.com' }

console.log('User 1 (Pick):', user1)
console.log('User 2 (Omit):', user2)

/**
 * ## 4. Cas d'usage pratiques de Pick
 */

// Cas 1 : Créer un type pour l'affichage (seulement certaines propriétés)
type UserDisplay = Pick<User, 'id' | 'name' | 'email' | 'role'>

function displayUser(user: UserDisplay): void {
  console.log(`${user.name} (${user.email}) - ${user.role}`)
}

const displayUserData: UserDisplay = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
}

displayUser(displayUserData)

// Cas 2 : Créer un type pour les mises à jour partielles
type UserUpdateFields = Pick<User, 'name' | 'email' | 'age'>

function updateUserFields(id: number, updates: Partial<UserUpdateFields>): void {
  console.log(`Updating user ${id} with:`, updates)
}

updateUserFields(1, { name: 'Alice Updated' })
updateUserFields(2, { email: 'newemail@example.com', age: 31 })

// Cas 3 : Sélectionner des propriétés pour un formulaire
type UserFormData = Pick<User, 'name' | 'email' | 'age'>

const formData: UserFormData = {
  name: 'Charlie',
  email: 'charlie@example.com',
  age: 28,
}

console.log('Form data:', formData)

// Cas 4 : Créer un type pour les réponses API (sans données sensibles)
type PublicUser = Pick<User, 'id' | 'name' | 'role'>

function getPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  }
}

const fullUser: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const publicUserData = getPublicUser(fullUser)
console.log('Public user:', publicUserData) // email et age sont exclus

/**
 * ## 5. Cas d'usage pratiques de Omit
 */

// Cas 1 : Créer un type pour l'insertion en base de données (sans id auto-généré)
type InsertUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

function insertUser(user: InsertUser): User {
  // Dans une vraie app, on insérerait en DB
  return {
    ...user,
    id: Math.floor(Math.random() * 1000), // Généré par la DB
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

const userToInsert: InsertUser = {
  name: 'Diana',
  email: 'diana@example.com',
  age: 27,
  role: 'user',
}

const insertedUser = insertUser(userToInsert)
console.log('Inserted user:', insertedUser)

// Cas 2 : Créer un type pour les mises à jour (sans champs calculés)
type UpdateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

function updateUserDataById(id: number, updates: Partial<UpdateUserInput>): void {
  console.log(`Updating user ${id}:`, updates)
}

updateUserDataById(1, {
  name: 'Alice Updated',
  age: 31,
  // id, createdAt, updatedAt ne peuvent pas être mis à jour
})

// Cas 3 : Exclure des propriétés sensibles
type SafeUser = Omit<User, 'email'> // Exclut l'email pour la sécurité

const safeUser: SafeUser = {
  id: 1,
  name: 'Alice',
  age: 30,
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
  // email est exclu
}

console.log('Safe user:', safeUser)

// Cas 4 : Créer un type pour les réponses API (sans métadonnées)
type UserResponse = Omit<User, 'createdAt' | 'updatedAt'>

function getUserResponse(user: User): UserResponse {
  const { createdAt, updatedAt, ...response } = user
  return response
}

const userResponse = getUserResponse(fullUser)
console.log('User response:', userResponse)

/**
 * ## 6. Combinaison de Pick et Omit
 */

// Combiner Pick et Omit (exemple pour montrer la combinaison)
// type UserSummary = Pick<User, 'id' | 'name' | 'role'> & Omit<User, 'email' | 'age'>

// Plus simple avec Pick directement
type UserSummary = Pick<User, 'id' | 'name' | 'role'>

const summary: UserSummary = {
  id: 1,
  name: 'Alice',
  role: 'admin',
}

console.log('User summary:', summary)

// Utiliser Omit puis Pick (rare mais possible)
type ComplexType = Pick<Omit<User, 'createdAt' | 'updatedAt'>, 'id' | 'name' | 'email'>

const complex: ComplexType = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
}

console.log('Complex type:', complex)

/**
 * ## 7. Pick et Omit avec Partial
 */

// Pick avec Partial pour des mises à jour partielles
type PartialUserUpdate = Partial<Pick<User, 'name' | 'email' | 'age'>>

function updateUserFieldsWithPartial(id: number, updates: PartialUserUpdate): void {
  console.log(`Updating user ${id}:`, updates)
}

updateUserFieldsWithPartial(1, { name: 'New Name' })
updateUserFieldsWithPartial(2, { email: 'new@example.com', age: 32 })

// Omit avec Partial
type PartialUserWithoutId = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>

const partialUpdate: PartialUserWithoutId = {
  name: 'Updated Name',
  // Toutes les autres propriétés sont optionnelles
}

console.log('Partial update:', partialUpdate)

/**
 * ## 8. Pick et Omit avec Readonly
 */

// Pick avec Readonly
type ReadonlyUserBasic = Readonly<Pick<User, 'id' | 'name' | 'email'>>

const readonlyBasic: ReadonlyUserBasic = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
}

// readonlyBasic.name = 'Bob' // ❌ Erreur : readonly

console.log('Readonly basic:', readonlyBasic)

// Omit avec Readonly
type ReadonlyUserWithoutId = Readonly<Omit<User, 'id'>>

const readonlyWithoutId: ReadonlyUserWithoutId = {
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
}

// readonlyWithoutId.name = 'Bob' // ❌ Erreur : readonly

console.log('Readonly without ID:', readonlyWithoutId)

/**
 * ## 9. Pick et Omit avec des types complexes
 */

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  metadata: {
    createdAt: Date
    updatedAt: Date
    createdBy: string
  }
}

// Pick avec propriétés imbriquées (ne fonctionne pas directement)
// Il faut créer un type séparé pour les propriétés imbriquées
type ProductBasic = Pick<Product, 'id' | 'name' | 'price' | 'category'>

const productBasic: ProductBasic = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  category: 'Electronics',
}

console.log('Product basic:', productBasic)

// Omit pour exclure les métadonnées
type ProductWithoutMetadata = Omit<Product, 'metadata'>

const productWithoutMetadata: ProductWithoutMetadata = {
  id: 1,
  name: 'Laptop',
  description: 'A powerful laptop',
  price: 999.99,
  category: 'Electronics',
  tags: ['laptop', 'computer'],
  // metadata est exclu
}

console.log('Product without metadata:', productWithoutMetadata)

/**
 * ## 10. Exemples pratiques complets
 */

// Exemple 1 : Système de gestion d'utilisateurs
interface FullUser {
  id: number
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  age: number
  role: 'admin' | 'user' | 'guest'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  lastLogin: Date | null
}

// Type pour la création (sans id, timestamps, et avec password hashé)
type CreateUserDto = Omit<FullUser, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin'>

// Type pour la mise à jour (sans champs calculés et password)
type UpdateUserDto = Partial<Omit<FullUser, 'id' | 'password' | 'createdAt' | 'updatedAt' | 'lastLogin'>>

// Type pour l'affichage public (sans données sensibles)
type PublicUserDto = Pick<FullUser, 'id' | 'username' | 'firstName' | 'lastName' | 'role'>

// Type pour l'authentification (seulement username et password)
type LoginDto = Pick<FullUser, 'username' | 'password'>

// Exemples d'utilisation
const createUser: CreateUserDto = {
  username: 'alice',
  email: 'alice@example.com',
  password: 'hashed_password',
  firstName: 'Alice',
  lastName: 'Smith',
  age: 30,
  role: 'user',
  isActive: true,
}

const updateUser: UpdateUserDto = {
  firstName: 'Alice Updated',
  age: 31,
}

const publicUserDto: PublicUserDto = {
  id: 1,
  username: 'alice',
  firstName: 'Alice',
  lastName: 'Smith',
  role: 'user',
}

const loginData: LoginDto = {
  username: 'alice',
  password: 'password123',
}

console.log('Create user:', createUser)
console.log('Update user:', updateUser)
console.log('Public user:', publicUserDto)
console.log('Login data:', loginData)

// Exemple 2 : API REST avec différents DTOs
interface Article {
  id: number
  title: string
  content: string
  authorId: number
  published: boolean
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

// DTO pour créer un article (sans id, stats, timestamps)
type CreateArticleDto = Omit<Article, 'id' | 'views' | 'likes' | 'createdAt' | 'updatedAt'>

// DTO pour mettre à jour un article (sans id, stats, timestamps)
type UpdateArticleDto = Partial<Omit<Article, 'id' | 'authorId' | 'views' | 'likes' | 'createdAt' | 'updatedAt'>>

// DTO pour lister les articles (sans contenu complet)
type ArticleListItem = Pick<Article, 'id' | 'title' | 'authorId' | 'published' | 'views' | 'likes' | 'createdAt'>

// DTO pour l'affichage complet (sans métadonnées internes)
type ArticleResponse = Omit<Article, 'authorId'>

const createArticle: CreateArticleDto = {
  title: 'Introduction to TypeScript',
  content: 'TypeScript is a typed superset...',
  authorId: 1,
  published: true,
}

const updateArticle: UpdateArticleDto = {
  title: 'Updated Title',
  published: false,
}

const articleListItem: ArticleListItem = {
  id: 1,
  title: 'Introduction to TypeScript',
  authorId: 1,
  published: true,
  views: 100,
  likes: 10,
  createdAt: new Date(),
}

const articleResponse: ArticleResponse = {
  id: 1,
  title: 'Introduction to TypeScript',
  content: 'TypeScript is a typed superset...',
  published: true,
  views: 100,
  likes: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
}

console.log('Create article:', createArticle)
console.log('Update article:', updateArticle)
console.log('Article list item:', articleListItem)
console.log('Article response:', articleResponse)

/**
 * ## 11. Astuces et bonnes pratiques
 */

// Astuce 1 : Créer un type helper pour les IDs
type EntityId<T extends { id: unknown }> = Pick<T, 'id'>

type UserIdFromHelper = EntityId<User>
const userIdFromHelper: UserIdFromHelper = { id: 1 }
console.log('User ID from helper:', userIdFromHelper)

// Astuce 2 : Créer un type helper pour les timestamps
type EntityWithoutTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>

type UserWithoutTimestampsHelper = EntityWithoutTimestamps<User>
const userWithoutTimestampsHelper: UserWithoutTimestampsHelper = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  role: 'admin',
}
console.log('User without timestamps helper:', userWithoutTimestampsHelper)

// Astuce 3 : Créer un type helper pour les mises à jour
type UpdateInput<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>

type UserUpdateInput = UpdateInput<User>

const userUpdate: UserUpdateInput = {
  name: 'Updated Name',
  email: 'updated@example.com',
}

console.log('User update:', userUpdate)

/**
 * ## Résumé
 *
 * ### Pick<T, K>
 * - **Usage** : Sélectionne certaines propriétés d'un type
 * - **Syntaxe** : `Pick<Type, 'key1' | 'key2'>`
 * - **Cas d'usage** : Créer des types pour l'affichage, les formulaires, les réponses API
 * - **Exemple** : `Pick<User, 'id' | 'name' | 'email'>`
 *
 * ### Omit<T, K>
 * - **Usage** : Exclut certaines propriétés d'un type
 * - **Syntaxe** : `Omit<Type, 'key1' | 'key2'>`
 * - **Cas d'usage** : Créer des types pour l'insertion, les mises à jour, exclure des données sensibles
 * - **Exemple** : `Omit<User, 'id' | 'createdAt' | 'updatedAt'>`
 *
 * ### Quand utiliser quoi ?
 * - **Pick** : Quand vous voulez seulement quelques propriétés spécifiques
 * - **Omit** : Quand vous voulez tout sauf quelques propriétés spécifiques
 * - **Pick + Partial** : Pour des mises à jour partielles de certaines propriétés
 * - **Omit + Partial** : Pour des mises à jour partielles en excluant certains champs
 *
 * ### Bonnes pratiques
 * 1. Utilisez **Pick** pour créer des types d'affichage ou de réponse API
 * 2. Utilisez **Omit** pour créer des types d'insertion ou de mise à jour
 * 3. Combinez avec **Partial** pour des mises à jour partielles
 * 4. Créez des types helpers réutilisables pour des patterns communs
 * 5. Documentez vos DTOs pour clarifier leur usage
 */

