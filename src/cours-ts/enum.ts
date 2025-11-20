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
enum Direction {
  North, // 0
  East,  // 1
  South, // 2
  West,  // 3
}

console.log('Direction.North =', Direction.North) // 0
console.log('Direction.East =', Direction.East)   // 1

// Utilisation
let playerDirection: Direction = Direction.North
console.log('Direction du joueur:', playerDirection)

// Enum avec valeurs personnalisées
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
  BadRequest = 400,
}

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
enum Priority {
  Low = 1,
  Medium,    // 2 (incrémenté automatiquement)
  High,      // 3
  Critical,  // 4
}

console.log('Priority.Low =', Priority.Low)     // 1
console.log('Priority.Medium =', Priority.Medium) // 2
console.log('Priority.High =', Priority.High)   // 3

/**
 * ## 2. Enum de chaînes (String Enum)
 *
 * Les enums de chaînes utilisent des valeurs string au lieu de nombres.
 * Ils sont plus lisibles et ne peuvent pas être inversés (pas de reverse mapping).
 */

enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

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

enum MixedEnum {
  No = 0,
  Yes = 'YES',
  Maybe = 2,
}

console.log('MixedEnum.No =', MixedEnum.No)     // 0
console.log('MixedEnum.Yes =', MixedEnum.Yes)   // "YES"
console.log('MixedEnum.Maybe =', MixedEnum.Maybe) // 2

/**
 * ## 4. Reverse Mapping (mapping inversé)
 *
 * Les enums numériques créent automatiquement un mapping inversé.
 * Cela permet d'accéder au nom de l'enum à partir de sa valeur.
 */

enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

console.log('Weekday.Monday =', Weekday.Monday)           // 1
console.log('Weekday[1] =', Weekday[1])                    // "Monday" (reverse mapping)
console.log('Weekday[Weekday.Monday] =', Weekday[Weekday.Monday]) // "Monday"

// ⚠️ Les enums de chaînes n'ont PAS de reverse mapping
// Color['RED'] // ❌ undefined

/**
 * ## 5. Enum const (const enum)
 *
 * Les const enums sont supprimés à la compilation et remplacés par leurs valeurs.
 * Ils ne créent pas d'objet JavaScript, ce qui réduit la taille du code.
 */

const enum Size {
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  XLarge = 'XL',
}

// Utilisation normale
const mySize: Size = Size.Medium
console.log('Taille:', mySize)

// ⚠️ Les const enums ne peuvent pas être utilisés avec Object.keys() ou Object.values()
// car ils n'existent pas à l'exécution

/**
 * ## 6. Utilisation pratique : Gestion d'états
 */

enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

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

console.log('Alice a accès admin?', hasAdminAccess(users[0]))
console.log('Bob a accès admin?', hasAdminAccess(users[1]))

/**
 * ## 7. Comparaison avec les alternatives
 */

// Alternative 1 : Union de types littéraux
type Status = 'pending' | 'approved' | 'rejected'

// Alternative 2 : Enum
enum StatusEnum {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

// Les deux approches sont valides, mais les enums offrent :
// - Un namespace pour regrouper les valeurs
// - Autocomplétion améliorée
// - Possibilité de reverse mapping (pour les enums numériques)

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

enum OrderStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
}

enum PaymentMethod {
  CreditCard = 1,
  PayPal = 2,
  BankTransfer = 3,
}

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

