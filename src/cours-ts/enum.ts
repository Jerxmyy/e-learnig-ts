/**
 * Les Enums (Énumérations) en TypeScript
 *
 * Un enum est un type qui permet de définir un ensemble de constantes nommées.
 * C'est utile pour représenter un groupe de valeurs fixes et liées.
 *
 * ## Avantages des enums :
 * - Code plus lisible et maintenable
 * - Autocomplétion dans l'IDE
 * - Vérification de type à la compilation
 * - Évite les erreurs de typo
 */

/**
 * ## 1. Enum numérique (par défaut)
 *
 * Les enums numériques assignent automatiquement des valeurs numériques
 * commençant à 0, ou vous pouvez spécifier les valeurs manuellement.
 */

// Enum numérique simple (commence à 0)
// Note: Avec erasableSyntaxOnly activé, on utilise une alternative avec objet constant
const Direction = {
  North: 0,
  East: 1,
  South: 2,
  West: 3,
} as const

type Direction = (typeof Direction)[keyof typeof Direction]

console.log('Direction.North =', Direction.North) // 0
console.log('Direction.East =', Direction.East)   // 1

// Utilisation
let playerDirection: Direction = Direction.North
console.log('Direction du joueur:', playerDirection)

// Enum avec valeurs personnalisées
const StatusCode = {
  OK: 200,
  NotFound: 404,
  ServerError: 500,
  BadRequest: 400,
} as const

type StatusCode = (typeof StatusCode)[keyof typeof StatusCode]

console.log('StatusCode.OK =', StatusCode.OK) // 200
console.log('StatusCode.NotFound =', StatusCode.NotFound) // 404

// Utilisation dans une fonction
function handleResponse(code: StatusCode): string {
  switch (code) {
    case StatusCode.OK:
      return 'Succès'
    case StatusCode.NotFound:
      return 'Non trouvé'
    case StatusCode.ServerError:
      return 'Erreur serveur'
    case StatusCode.BadRequest:
      return 'Requête invalide'
    default:
      return 'Code inconnu'
  }
}

console.log(handleResponse(StatusCode.OK))
console.log(handleResponse(StatusCode.NotFound))

// Enum avec valeurs partiellement définies
const Priority = {
  Low: 1,
  Medium: 2,    // 2 (incrémenté manuellement)
  High: 3,      // 3
  Critical: 4,  // 4
} as const

type Priority = (typeof Priority)[keyof typeof Priority]

console.log('Priority.Low =', Priority.Low)     // 1
console.log('Priority.Medium =', Priority.Medium) // 2
console.log('Priority.High =', Priority.High)   // 3

/**
 * ## 2. Enum de chaînes (String Enum)
 *
 * Les enums de chaînes utilisent des valeurs string au lieu de nombres.
 * Ils sont plus lisibles et ne peuvent pas être inversés (pas de reverse mapping).
 */

const Color = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE',
} as const

type Color = (typeof Color)[keyof typeof Color]

console.log('Color.Red =', Color.Red) // "RED"

// Utilisation
function getColorHex(color: Color): string {
  switch (color) {
    case Color.Red:
      return '#FF0000'
    case Color.Green:
      return '#00FF00'
    case Color.Blue:
      return '#0000FF'
  }
}

console.log('Hex de Red:', getColorHex(Color.Red))

/**
 * ## 3. Enum hétérogène (mélange de nombres et chaînes)
 *
 * Bien que possible, ce n'est généralement pas recommandé.
 */

const MixedEnum = {
  No: 0,
  Yes: 'YES',
  Maybe: 2,
} as const

type MixedEnum = (typeof MixedEnum)[keyof typeof MixedEnum]

console.log('MixedEnum.No =', MixedEnum.No)     // 0
console.log('MixedEnum.Yes =', MixedEnum.Yes)   // "YES"
console.log('MixedEnum.Maybe =', MixedEnum.Maybe) // 2

/**
 * ## 4. Reverse Mapping (mapping inversé)
 *
 * Les enums numériques créent automatiquement un mapping inversé.
 * Cela permet d'accéder au nom de l'enum à partir de sa valeur.
 */

const Weekday = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
} as const

type Weekday = (typeof Weekday)[keyof typeof Weekday]

// Fonction helper pour le reverse mapping (simulation)
function getWeekdayName(value: Weekday): string {
  const entries = Object.entries(Weekday) as [string, Weekday][]
  const found = entries.find(([, v]) => v === value)
  return found ? found[0] : 'Unknown'
}

console.log('Weekday.Monday =', Weekday.Monday)           // 1
console.log('getWeekdayName(1) =', getWeekdayName(1))     // "Monday" (reverse mapping simulé)
console.log('getWeekdayName(Weekday.Monday) =', getWeekdayName(Weekday.Monday)) // "Monday"

// ⚠️ Les enums de chaînes n'ont PAS de reverse mapping
// Color['RED'] // ❌ undefined

/**
 * ## 5. Alternative moderne : Objet constant (simule const enum)
 *
 * Les objets constants avec "as const" sont une alternative moderne aux const enums.
 * Ils sont éliminés par le tree-shaking et offrent une meilleure compatibilité.
 */

const Size = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
  XLarge: 'XL',
} as const

type Size = (typeof Size)[keyof typeof Size]

// Utilisation normale
const mySize: Size = Size.Medium
console.log('Taille:', mySize)

// ✅ Les objets constants peuvent être utilisés avec Object.keys() ou Object.values()
console.log('Toutes les tailles:', Object.values(Size))

/**
 * ## 6. Utilisation pratique : Gestion d'états
 */

const UserRole = {
  Admin: 'ADMIN',
  User: 'USER',
  Guest: 'GUEST',
} as const

type UserRole = (typeof UserRole)[keyof typeof UserRole]

type User = {
  id: number
  name: string
  role: UserRole
}

const users: User[] = [
  { id: 1, name: 'Alice', role: UserRole.Admin },
  { id: 2, name: 'Bob', role: UserRole.User },
  { id: 3, name: 'Charlie', role: UserRole.Guest },
]

function hasAdminAccess(user: User): boolean {
  return user.role === UserRole.Admin
}

// Vérification de type pour éviter les erreurs undefined
const alice = users[0]
const bob = users[1]

if (alice && bob) {
  console.log('Alice a accès admin?', hasAdminAccess(alice))
  console.log('Bob a accès admin?', hasAdminAccess(bob))
}

/**
 * ## 7. Comparaison avec les alternatives
 */

// Alternative 1 : Union de types littéraux
type Status = 'pending' | 'approved' | 'rejected'

// Exemple d'utilisation de Status
const currentStatusUnion: Status = 'pending'
console.log('Status (union type):', currentStatusUnion)

// Alternative 2 : Objet constant (simule enum)
const StatusEnum = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
} as const

type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum]

// Exemple d'utilisation
const currentStatus: StatusEnum = StatusEnum.Pending
console.log('Status actuel (enum-like):', currentStatus)

// Les deux approches sont valides, mais les objets constants offrent :
// - Un namespace pour regrouper les valeurs
// - Autocomplétion améliorée
// - Meilleure compatibilité avec erasableSyntaxOnly

/**
 * ## 8. Bonnes pratiques
 *
 * ### Quand utiliser un enum :
 * - Vous avez un ensemble fixe de valeurs liées
 * - Vous voulez un namespace pour regrouper les valeurs
 * - Vous avez besoin du reverse mapping (enum numérique)
 *
 * ### Quand NE PAS utiliser un enum :
 * - Les valeurs changent fréquemment
 * - Vous préférez une approche plus fonctionnelle
 * - Vous voulez éviter le code JavaScript généré (utilisez const enum ou union types)
 */

/**
 * ## 9. Exemple complet : Système de commande
 */

const OrderStatus = {
  Pending: 'PENDING',
  Processing: 'PROCESSING',
  Shipped: 'SHIPPED',
  Delivered: 'DELIVERED',
  Cancelled: 'CANCELLED',
} as const

type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

const PaymentMethod = {
  CreditCard: 1,
  PayPal: 2,
  BankTransfer: 3,
} as const

type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]

type Order = {
  id: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  amount: number
}

const orders: Order[] = [
  { id: 1, status: OrderStatus.Pending, paymentMethod: PaymentMethod.CreditCard, amount: 100 },
  { id: 2, status: OrderStatus.Shipped, paymentMethod: PaymentMethod.PayPal, amount: 250 },
]

function canCancelOrder(order: Order): boolean {
  return order.status === OrderStatus.Pending || order.status === OrderStatus.Processing
}

function getStatusMessage(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return 'Votre commande est en attente'
    case OrderStatus.Processing:
      return 'Votre commande est en cours de traitement'
    case OrderStatus.Shipped:
      return 'Votre commande a été expédiée'
    case OrderStatus.Delivered:
      return 'Votre commande a été livrée'
    case OrderStatus.Cancelled:
      return 'Votre commande a été annulée'
  }
}

orders.forEach((order) => {
  console.log(`Commande #${order.id}: ${getStatusMessage(order.status)}`)
  console.log(`Peut être annulée: ${canCancelOrder(order)}`)
})

/**
 * ## Résumé
 *
 * - **Enum numérique** : Valeurs numériques, reverse mapping disponible
 * - **Enum de chaînes** : Valeurs string, plus lisibles, pas de reverse mapping
 * - **Const enum** : Supprimé à la compilation, réduit la taille du code
 * - **Utilisation** : Pour représenter un ensemble fixe de valeurs liées
 * - **Avantages** : Autocomplétion, vérification de type, code plus lisible
 */

