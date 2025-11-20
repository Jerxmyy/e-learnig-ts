/**
 * Les Fonctions en TypeScript - Guide Complet
 *
 * Ce fichier couvre tous les aspects des fonctions en TypeScript :
 * déclaration, paramètres, types de retour, fonctions fléchées, génériques, etc.
 */

/**
 * ## 1. Déclaration de fonction classique
 *
 * Syntaxe : function nomFonction(param: type): typeRetour { ... }
 */

function add(a: number, b: number): number {
  return a + b
}

console.log('add(5, 3) =', add(5, 3))

// Fonction sans retour (void)
function greet(name: string): void {
  console.log(`Bonjour, ${name}!`)
}

greet('Alice')

// Fonction qui ne retourne jamais (never)
function throwError(message: string): never {
  throw new Error(message)
}

// Exemple d'utilisation (commenté pour ne pas lancer d'erreur)
// throwError('Une erreur') // Lance une exception
console.log('throwError function defined:', typeof throwError)

// Démonstration du type never (commenté car ne peut pas être exécuté)
// const neverExample: never = throwError('test') // Cette ligne ne peut jamais être atteinte

/**
 * ## 2. Fonction fléchée (Arrow Function)
 *
 * Syntaxe : const nomFonction = (param: type): typeRetour => { ... }
 */

const multiply = (a: number, b: number): number => {
  return a * b
}

console.log('multiply(4, 5) =', multiply(4, 5))

// Fonction fléchée avec une seule expression (return implicite)
const divide = (a: number, b: number): number => a / b

console.log('divide(10, 2) =', divide(10, 2))

// Fonction fléchée sans paramètres
const getCurrentTime = (): string => {
  return new Date().toISOString()
}

console.log('Current time:', getCurrentTime())

/**
 * ## 3. Paramètres optionnels
 *
 * Utilisez "?" pour rendre un paramètre optionnel.
 */

function createSimpleUser(name: string, age?: number): { name: string; age: number | undefined } {
  return { name, age }
}

console.log('User 1:', createSimpleUser('Alice'))
console.log('User 2:', createSimpleUser('Bob', 25))

// Fonction fléchée avec paramètre optionnel
const greetUser = (name: string, title?: string): string => {
  return title ? `${title} ${name}` : name
}

console.log('Greet 1:', greetUser('Alice'))
console.log('Greet 2:', greetUser('Bob', 'Dr.'))

/**
 * ## 4. Paramètres avec valeur par défaut
 *
 * Les valeurs par défaut sont assignées si le paramètre n'est pas fourni.
 */

function calculatePrice(price: number, tax: number = 0.20, discount: number = 0): number {
  return price * (1 + tax) - discount
}

console.log('Price 1:', calculatePrice(100)) // tax = 0.20, discount = 0
console.log('Price 2:', calculatePrice(100, 0.15)) // tax = 0.15, discount = 0
console.log('Price 3:', calculatePrice(100, 0.20, 10)) // tax = 0.20, discount = 10

// Fonction fléchée avec valeurs par défaut
const formatDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('fr-FR')
}

console.log('Date:', formatDate())
console.log('Date spécifique:', formatDate(new Date('2024-01-15')))

/**
 * ## 5. Paramètres rest (spread operator)
 *
 * Permet d'accepter un nombre indéfini d'arguments.
 */

function sum(...numbers: number[]): number {
  return numbers.reduce((acc, val) => acc + val, 0)
}

console.log('Sum 1:', sum(1, 2, 3))
console.log('Sum 2:', sum(1, 2, 3, 4, 5, 6))

// Fonction fléchée avec rest
const max = (...numbers: number[]): number => {
  return Math.max(...numbers)
}

console.log('Max:', max(10, 5, 8, 20, 3))

// Combinaison de paramètres normaux et rest
function createEmail(to: string, subject: string, ...cc: string[]): string {
  return `To: ${to}, Subject: ${subject}, CC: ${cc.join(', ')}`
}

console.log('Email:', createEmail('alice@example.com', 'Hello', 'bob@example.com', 'charlie@example.com'))

/**
 * ## 6. Inférence de type de retour
 *
 * TypeScript peut inférer automatiquement le type de retour.
 */

// TypeScript infère que le retour est number
function subtract(a: number, b: number) {
  return a - b
}

console.log('subtract(10, 3) =', subtract(10, 3))

// Mais il est recommandé d'être explicite pour la clarté
function explicitSubtract(a: number, b: number): number {
  return a - b
}

console.log('Explicit subtract:', explicitSubtract(10, 3))

/**
 * ## 7. Types de fonction (Function Types)
 *
 * Vous pouvez typer une variable comme étant une fonction.
 */

// Type de fonction simple
type MathOperation = (a: number, b: number) => number

const addOperation: MathOperation = (a, b) => a + b
const multiplyOperation: MathOperation = (a, b) => a * b

console.log('Add operation:', addOperation(5, 3))
console.log('Multiply operation:', multiplyOperation(4, 5))

// Type de fonction avec interface (callable interface)
interface CalculatorFunction {
  (a: number, b: number): number
}

const subtractOperation: CalculatorFunction = (a, b) => a - b
console.log('Subtract operation:', subtractOperation(10, 4))

// Type de fonction complexe
type EventHandler = (event: Event) => void

const handleClick: EventHandler = (event) => {
  console.log('Click event:', event.type)
}

// Exemple d'utilisation (simulé)
// document.addEventListener('click', handleClick)

// Démonstration du type EventHandler
console.log('Type EventHandler:', typeof handleClick)
console.log('handleClick function defined')

/**
 * ## 8. Fonctions génériques
 *
 * Permettent de créer des fonctions réutilisables avec différents types.
 */

// Fonction générique simple
function identity<T>(arg: T): T {
  return arg
}

console.log('Identity string:', identity<string>('Hello'))
console.log('Identity number:', identity<number>(42))
console.log('Identity (inféré):', identity(true)) // TypeScript infère le type

// Fonction générique avec contrainte
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}

console.log('Length string:', getLength('Hello'))
console.log('Length array:', getLength([1, 2, 3, 4, 5]))

// Fonction générique avec plusieurs paramètres de type
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}

const merged = merge({ name: 'Alice' }, { age: 30 })
console.log('Merged:', merged)

/**
 * ## 9. Surcharge de fonctions (Function Overloads)
 *
 * Permet de définir plusieurs signatures pour une même fonction.
 */

// Déclaration des surcharges
function process(value: string): string
function process(value: number): number
function process(value: boolean): boolean
// Implémentation
function process(value: string | number | boolean): string | number | boolean {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  if (typeof value === 'number') {
    return value * 2
  }
  return !value
}

console.log('Process string:', process('hello'))
console.log('Process number:', process(5))
console.log('Process boolean:', process(true))

/**
 * ## 10. Fonctions comme paramètres (Callbacks)
 */

// Fonction qui prend une fonction en paramètre
function executeOperation(a: number, b: number, operation: (x: number, y: number) => number): number {
  return operation(a, b)
}

console.log('Execute add:', executeOperation(5, 3, (x, y) => x + y))
console.log('Execute multiply:', executeOperation(4, 5, (x, y) => x * y))

// Utilisation avec des fonctions nommées
const addFn = (a: number, b: number): number => a + b
const multiplyFn = (a: number, b: number): number => a * b

console.log('Execute with named function:', executeOperation(10, 2, addFn))
console.log('Execute with named function:', executeOperation(10, 2, multiplyFn))

// Fonction avec callback pour les tableaux
function mapArray<T, U>(arr: T[], mapper: (item: T) => U): U[] {
  return arr.map(mapper)
}

const numbers = [1, 2, 3, 4, 5]
const doubled = mapArray(numbers, (n) => n * 2)
console.log('Doubled:', doubled)

const strings = ['hello', 'world']
const uppercased = mapArray(strings, (s) => s.toUpperCase())
console.log('Uppercased:', uppercased)

/**
 * ## 11. Fonctions avec "this" typé
 *
 * Permet de typer explicitement le contexte "this".
 */

interface Counter {
  value: number
  increment: (step?: number) => void
  decrement: (step?: number) => void
}

const counter: Counter = {
  value: 0,
  increment(step = 1) {
    this.value += step
  },
  decrement(step = 1) {
    this.value -= step
  },
}

counter.increment(5)
counter.increment(3)
counter.decrement(2)
console.log('Counter value:', counter.value)

// Fonction avec this explicite
interface CalculatorObject {
  value: number
}

function addToCalculator(this: CalculatorObject, n: number): void {
  this.value += n
}

const calc: CalculatorObject = { value: 10 }
addToCalculator.call(calc, 5)
console.log('Calculator value:', calc.value)

/**
 * ## 12. Fonctions asynchrones (async/await)
 */

// Fonction async retourne une Promise
async function fetchData(url: string): Promise<string> {
  // Simulation d'une requête
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`)
    }, 1000)
  })
}

// Utilisation avec async/await
async function displayData(): Promise<void> {
  const data = await fetchData('https://api.example.com')
  console.log('Fetched data:', data)
}

// Exemple d'utilisation (commenté pour ne pas bloquer)
// displayData() // Décommentez pour tester

// Démonstration de la fonction displayData
console.log('displayData function defined:', typeof displayData)

// Fonction async avec gestion d'erreur
async function safeFetch(url: string): Promise<string | null> {
  try {
    const data = await fetchData(url)
    return data
  } catch (error) {
    console.error('Error fetching:', error)
    return null
  }
}

// Démonstration de la fonction safeFetch
console.log('safeFetch function defined:', typeof safeFetch)

// Exemple d'utilisation (commenté)
// safeFetch('https://api.example.com').then(result => console.log('Safe fetch result:', result))
console.log('Async functions defined')

/**
 * ## 13. Fonctions avec type guards
 *
 * Permettent de rétrécir le type d'un paramètre.
 */

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

function processValue(value: unknown): string {
  if (isString(value)) {
    // TypeScript sait que value est string ici
    return value.toUpperCase()
  }
  if (isNumber(value)) {
    // TypeScript sait que value est number ici
    return value.toString()
  }
  return 'Unknown type'
}

console.log('Process string:', processValue('hello'))
console.log('Process number:', processValue(42))

/**
 * ## 14. Fonctions avec paramètres nommés (simulation avec objet)
 *
 * TypeScript ne supporte pas les paramètres nommés natifs, mais on peut les simuler avec un objet.
 */

interface CreateUserParams {
  name: string
  age: number
  email?: string
  isActive?: boolean
}

function createUser(params: CreateUserParams): { name: string; age: number; email?: string; isActive: boolean } {
  return {
    name: params.name,
    age: params.age,
    email: params.email,
    isActive: params.isActive ?? true,
  }
}

const newUser = createUser({
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
})

console.log('New user:', newUser)

// Avec destructuration
function createUserDestructured({ name, age, email, isActive = true }: CreateUserParams) {
  return { name, age, email, isActive }
}

const newUser2 = createUserDestructured({
  name: 'Bob',
  age: 25,
})

console.log('New user 2:', newUser2)

/**
 * ## 15. Fonctions avec type de retour conditionnel
 */

function getValue<T extends string | number>(value: T): T extends string ? string : number {
  return value as unknown as T extends string ? string : number
}

const strValue = getValue('hello')
const numValue = getValue(42)

console.log('String value:', strValue)
console.log('Number value:', numValue)

/**
 * ## 16. Fonctions avec assertions de type
 */

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string')
  }
}

function processString(value: unknown): string {
  assertIsString(value)
  // TypeScript sait que value est string ici
  return value.toUpperCase()
}

console.log('Process string:', processString('hello'))
// console.log(processString(42)) // Lancerait une erreur

/**
 * ## 17. Fonctions utilitaires courantes
 */

// Fonction pour créer un objet avec des valeurs par défaut
function withDefaults<T extends Record<string, unknown>>(
  obj: Partial<T>,
  defaults: T
): T {
  return { ...defaults, ...obj } as T
}

const config = withDefaults(
  { timeout: 5000 },
  { timeout: 3000, retries: 3, debug: false } as { timeout: number; retries: number; debug: boolean }
)

console.log('Config with defaults:', config)

// Fonction pour filtrer un tableau avec type guard
function filterByType<T, U extends T>(
  arr: T[],
  predicate: (item: T) => item is U
): U[] {
  return arr.filter(predicate)
}

const mixed = [1, 'hello', 2, 'world', 3]
const numbersOnly = filterByType(mixed, (item): item is number => typeof item === 'number')
console.log('Numbers only:', numbersOnly)

/**
 * ## 18. Comparaison : fonction classique vs fonction fléchée
 */

// Fonction classique
function regularFunction() {
  console.log('Regular function defined')
}

// Fonction fléchée (pas de "this" propre)
const arrowFunction = () => {
  console.log('Arrow function defined')
  // this serait undefined en mode strict
}

// Exemples d'utilisation
regularFunction()
arrowFunction()

// Dans une classe
class Example {
  name = 'Example'

  regularMethod() {
    console.log('Regular method this:', this.name)
  }

  arrowMethod = () => {
    console.log('Arrow method this:', this.name)
  }
}

const example = new Example()
example.regularMethod()
example.arrowMethod()

/**
 * ## Résumé des bonnes pratiques
 *
 * 1. **Utilisez des types explicites** pour les paramètres et le retour
 * 2. **Préférez les fonctions fléchées** pour les callbacks et méthodes courtes
 * 3. **Utilisez des fonctions classiques** pour les méthodes de classe et le hoisting
 * 4. **Utilisez des génériques** pour la réutilisabilité
 * 5. **Utilisez des paramètres nommés** (objets) pour les fonctions avec beaucoup de paramètres
 * 6. **Utilisez des type guards** pour le type narrowing
 * 7. **Documentez vos fonctions** avec des commentaires JSDoc
 */

/**
 * ## Exemple complet : Système de validation
 */

type Validator<T> = (value: T) => boolean

function createValidator<T>(validators: Validator<T>[]): (value: T) => boolean {
  return (value: T) => {
    return validators.every((validator) => validator(value))
  }
}

const isPositive: Validator<number> = (n) => n > 0
const isEven: Validator<number> = (n) => n % 2 === 0
const isLessThan100: Validator<number> = (n) => n < 100

const validateNumber = createValidator([isPositive, isEven, isLessThan100])

console.log('Validate 50:', validateNumber(50)) // true
console.log('Validate 51:', validateNumber(51)) // false (impair)
console.log('Validate -5:', validateNumber(-5)) // false (négatif)
console.log('Validate 150:', validateNumber(150)) // false (> 100)

