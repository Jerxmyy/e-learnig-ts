/**
 * Inférence de Type en TypeScript
 *
 * ## Différence entre `var`, `let` et `const`
 *
 * ### `var`
 * - Crée une variable globale dont la déclaration serait poussée en haut du scope (hoisting)
 * - Scope fonctionnel
 *
 * ### `let` et `const`
 * - Scope au bloc (block-scoped)
 * - `let` : permet la réassignation
 * - `const` : constante, ne permet pas la réassignation
 *
 * ## Inférence de type (Type Inference)
 *
 * TypeScript peut automatiquement inférer le type d'une variable à partir de sa valeur initiale.
 */

// Différence entre var, let et const
// var crée une variable globale dont la déclaration serait poussée en haut du scope
// let et const sont scope au bloc

// Type inference
let a = 12 // TS (TypeScript) infère que a est de type number
console.log(typeof a)

let strA = a.toString() // Transtypage manuel en string
strA = 'Hello' // strA est de type string, donc cette assignation fonctionne

console.log(a)
console.log(typeof a)
console.log(strA)

/**
 * ## Types littéraux (Literal Types) avec `const`
 *
 * ### Différence entre `let` et `const` pour les types
 *
 * Avec `let`, TypeScript infère un type général (`string`). Avec `const`, TypeScript infère un type littéral (`"red"`), car la valeur ne peut pas changer.
 */

// let - const
let color = 'red'
// ici color est de type string

const accent = 'red'
// ici accent est de type "red" (literal type) car c'est une constante

// idem pour les numbers
let n = 42 // type number
const m = 42 // type 42 (literal type)

// Exemples d'utilisation
console.log(color, accent, n, m)

/**
 * ### Bonne pratique
 * Utiliser `const` pour toutes vos déclarations de variables, sauf si vous avez besoin de réassigner la variable plus tard, auquel cas utilisez `let`. ÉVITER `var`.
 */

// bon reflexe : utiliser const pour tout vos déclarations de variables
// sauf si vous avez besoin de réassigner la variable plus tard, auquel cas utilisez let. EVITER VAR

/**
 * ## Objets et tableaux : pourquoi `const` change tout !
 *
 * ### Objets avec `as const`
 * Le mot-clé `as const` crée un type littéral immuable pour l'objet entier. Toutes les propriétés deviennent en lecture seule.
 */

// Objet et tableaux : pourquoi const change tout!
const user = {
  role: 'admin',
  id: 1,
} as const
// ici user est de type { role: 'admin', id: 1 }
// et on ne peut pas modifier les propriétés de user

// user.role = 'user' // Erreur de type : role ne peut pas être modifié
// user = {
//   role: 'user',
//   id: 2,
// } // Erreur de type : user ne peut pas être modifié
// user.id = 2 // Erreur de type : id ne peut pas être modifié

console.log(user)

const sizes = ['small', 'medium', 'large'] // type string[] (tableau de strings (tableau --> liste))

const sizesConst = ['small', 'medium', 'large'] as const
// type de sizesConst est readonly ["small", "medium", "large"]

// sizesConst.push('x1') // erreur car sizesConst est en readonly

console.log(typeof sizesConst[0])
// type de sizesConst[0] est readonly "small"
console.log(sizes, sizesConst)

/**
 * ### Conclusion
 * Utiliser `const` pour les objets et les tableaux si vous ne voulez pas que les propriétés ou les éléments soient modifiés.
 */

// conclusion : utiliser const pour les objets et les tableaux si vous ne voulez pas que les propriétés ou les éléments soient modifiés

/**
 * ## Inférence contextuelle
 *
 * TypeScript peut inférer les types dans des contextes spécifiques, comme dans les callbacks.
 */

// inference contextuelle
const nums = [1, 2, 3]
const doubleNums = nums.map((num) => num * 2)
// TypeScript infère que num est de type number
// et que doubleNums est de type number[]

console.log(doubleNums)

/**
 * ## Fonctions : paramètres, retours et annotations de type
 *
 * ### Fonction avec type de retour explicite
 * On spécifie explicitement que :
 * - Le paramètre `x` est de type `number`
 * - La fonction retourne un `number`
 *
 * ### Fonction avec type de retour `void`
 * Le type `void` indique que la fonction ne retourne aucune valeur.
 */

// fonction: parametres, retours génériques
function double(x: number): number {
  return x * 2
}

console.log(double(5)) // 10

function saluer(nom: string): void {
  console.log(`Bonjour ${nom.toUpperCase()}!`)
}
saluer('Jerem')

/**
 * ## Fonctions génériques
 *
 * Les fonctions génériques permettent de créer des fonctions réutilisables qui fonctionnent avec différents types.
 *
 * ### Exemple : fonction `identity`
 * La fonction `identity` utilise un **type générique** `<T>` qui représente n'importe quel type. Cela permet :
 * - De spécifier explicitement le type lors de l'appel : `identity<number>(42)`
 * - TypeScript infère automatiquement le type de retour en fonction du type passé en paramètre
 * - La fonction reste type-safe tout en étant réutilisable avec différents types
 *
 * Le `<T>` est un paramètre de type qui peut être remplacé par n'importe quel type concret (`number`, `string`, `boolean`, etc.).
 */

function identity<T>(arg: T): T {
  return arg
}

console.log(identity<number>(42))
console.log(identity<string>('Hello'))
console.log(identity<boolean>(true))
