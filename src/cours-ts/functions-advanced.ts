/**
 * Concepts Avancés de TypeScript - Guide Complet
 *
 * Ce fichier traduit la documentation README en code TypeScript fonctionnel.
 * Il couvre les concepts avancés : déclarations de fonctions, paramètres,
 * génériques, surcharge, enums et leurs alternatives modernes.
 */

// ============================================================================
// SECTION 1: Déclaration de fonction classique vs fonction fléchée typée
// ============================================================================
//
// Il existe deux approches principales pour déclarer des fonctions en TypeScript :
// la déclaration classique et la fonction fléchée avec annotation de type explicite.
// Chaque approche a ses caractéristiques et avantages spécifiques.

// ----------------------------------------------------------------------------
// Approche 1: Déclaration de fonction classique
// ----------------------------------------------------------------------------
//
// Syntaxe: function nomFonction(paramètres): typeRetour { ... }
//
// Caractéristiques:
// - Hoisting: La fonction est disponible avant sa déclaration dans le code
// - Utilisation: Idéale pour des fonctions réutilisables dans tout le scope
// - Avantage: Peut être appelée avant sa déclaration dans le code
//
// Exemple:
function add(a: number, b: number): number {
  return a + b
}

// Exemple d'utilisation
console.log('add(5, 3) =', add(5, 3))

// ----------------------------------------------------------------------------
// Approche 2: Fonction fléchée avec annotation de type explicite
// ----------------------------------------------------------------------------
//
// Syntaxe: const nomFonction: (paramètres) => typeRetour = (paramètres) => { ... }
//
// Caractéristiques:
// - Le type est annoté AVANT la fonction, pas dans la signature
// - Plus explicite sur le type de la variable constante
// - Pas de hoisting: Doit être déclarée avant utilisation
// - Avantage: Clarifie explicitement que c'est une constante de type fonction
//
// Exemple:
const subtract: (a: number, b: number) => number = (a, b) => {
  return a - b
}

// Exemple d'utilisation
console.log('subtract(10, 4) =', subtract(10, 4))

// ============================================================================
// SECTION 2: Paramètre optionnel vs valeur par défaut
// ============================================================================
//
// IMPORTANT: Ce sont deux concepts différents en TypeScript !
//
// Dans la signature de type: b?: number
// - Le "?" signifie que le paramètre est OPTIONNEL
// - TypeScript sait que b peut être undefined
// - L'appelant peut omettre le paramètre: divide(5)
//
// Dans l'implémentation: b = 10
// - La valeur par défaut garantit que b aura toujours une valeur
// - Si b n'est pas fourni, il prendra la valeur 10
// - Cela évite les erreurs d'exécution si on accède à b
//
// Pourquoi cette combinaison ?
// - Le type dit "b est optionnel" (peut être omis)
// - L'implémentation dit "si omis, utilise 10" (sécurité à l'exécution)
//
// Cette approche combine la flexibilité d'un paramètre optionnel avec
// la sécurité d'une valeur par défaut garantie.

const divide: (a: number, b?: number) => number = (a, b = 10) => {
  return a / b
}

// Exemples d'utilisation
console.log('divide(5) =', divide(5)) // b prendra la valeur 10
console.log('divide(20, 4) =', divide(20, 4)) // b = 4

// ============================================================================
// SECTION 3: Paramètres rest
// ============================================================================
//
// Syntaxe: ...nomParamètre: type[]
//
// Caractéristiques:
// - Le "..." (spread operator) permet d'accepter un nombre indéfini de paramètres
// - Tous les arguments sont regroupés dans un tableau
// - Utile pour des fonctions flexibles qui acceptent plusieurs valeurs
// - Permet de créer des fonctions variadiques (acceptant un nombre variable d'arguments)
//
// Exemple: multiply(2, 3, 4, 5) → numbers = [2, 3, 4, 5]

function multiply(...numbers: number[]): number {
  return numbers.reduce((acc, val) => acc * val, 1)
}

// Exemples d'utilisation
console.log('multiply(2, 3, 4, 5) =', multiply(2, 3, 4, 5)) // numbers = [2, 3, 4, 5]
console.log('multiply(10) =', multiply(10)) // numbers = [10]
console.log('multiply() =', multiply()) // numbers = [], retourne 1 (valeur initiale du reduce)

// ============================================================================
// SECTION 4: Annotation explicite de "this"
// ============================================================================
//
// Syntaxe: function nomFonction(this: Type, ...paramètres)
//
// Caractéristiques:
// - TypeScript permet de typer explicitement le contexte "this"
// - Utile pour garantir que la fonction est appelée avec le bon objet
// - Doit être appelée avec .call(), .apply(), ou .bind() pour spécifier le contexte
// - Différence avec JavaScript: TypeScript vérifie le type de "this" à la compilation
// - Avantage: Prévention des erreurs liées au contexte d'exécution
//
// Note: On ne peut pas appeler inc(h) directement, il faut utiliser .call()

type Counter = { val: number }

function inc(this: Counter, step = 1): void {
  this.val += step
  console.log('Compteur:', this.val)
}

// Exemple d'utilisation
const h: Counter = { val: 0 }
inc.call(h) // On ne peut pas appeler inc(h) directement
inc.call(h, 5) // Incrémente de 5

// Exemple avec plusieurs appels
const counter1: Counter = { val: 10 }
inc.call(counter1, 3) // Compteur: 13
inc.call(counter1) // Compteur: 14

// ============================================================================
// SECTION 5: Union type vs unknown avec type guards
// ============================================================================
//
// Deux approches pour gérer des types multiples : union types explicites
// et unknown avec type guards. Chaque approche a ses avantages et cas d'usage.

// ----------------------------------------------------------------------------
// Approche 1: Union type explicite
// ----------------------------------------------------------------------------
//
// Syntaxe: paramètre: type1 | type2
//
// Caractéristiques:
// - TypeScript sait que le paramètre est soit type1, soit type2
// - Avantage: Type checking à la compilation, accès direct aux propriétés communes
// - Limitation: Doit lister tous les types possibles à l'avance
// - Utilisation: Quand on connaît tous les types possibles à l'avance
//
// Exemple:
function len(str: string | any[]): number {
  return str.length
}

// Exemples d'utilisation
console.log('len("Hello TS") =', len('Hello TS')) // ✅ OK
console.log('len([1, 2, 3, 4, 5]) =', len([1, 2, 3, 4, 5])) // ✅ OK

// ----------------------------------------------------------------------------
// Approche 2: unknown avec type guards
// ----------------------------------------------------------------------------
//
// Syntaxe: paramètre: unknown + vérifications avec typeof/Array.isArray()
//
// Caractéristiques:
// - Plus flexible, accepte n'importe quel type
// - Sécurité: TypeScript rétrécit le type après chaque vérification (type narrowing)
// - Différence clé: unknown force à vérifier le type avant utilisation
// - Avantage: Plus flexible, peut gérer des types non prévus à l'avance
// - Utilisation: Quand on veut une fonction très flexible qui accepte n'importe quel type
//
// Type guard: TypeScript comprend que si on passe le if, x est string | any[]
// Dans le bloc if, TypeScript sait que x.length existe

function lenRefined(x: unknown): number {
  // Type guard: TypeScript comprend que si on passe ce if, x est string | any[]
  if (typeof x === 'string' || Array.isArray(x)) {
    return x.length // Ici, TypeScript sait que x.length existe
  }
  throw new Error('Type non supporté')
}

// Exemples d'utilisation
console.log('lenRefined("Hello") =', lenRefined('Hello'))
console.log('lenRefined([1, 2, 3]) =', lenRefined([1, 2, 3]))

// ⚠️ EXEMPLE PÉDAGOGIQUE : Tentative avec un type non supporté
// Cette ligne va lancer une erreur à l'exécution pour démontrer l'importance des type guards
// C'est intentionnel pour montrer aux développeurs juniors pourquoi il faut vérifier les types
console.log('lenRefined(true) =', lenRefined(true)) // ❌ Lancerait: "Type non supporté"

// ============================================================================
// SECTION 6: Fonction générique avec contraintes complexes
// ============================================================================
//
// Syntaxe: function nomFonction<T, K extends keyof T>(...)
//
// Concepts clés:
// - <T>: Type générique qui représente n'importe quel type
// - <K extends keyof T>: K est contraint à être une clé de T
//   * "keyof T" = union de toutes les clés de type T
//   * "extends" = K doit être une sous-clé de T
// - T[K]: Type de la valeur associée à la clé K dans T (indexed access type)
//
// Exemple avec User:
// - T = User = { id: number; name: string; age: number }
// - K peut être: "id" | "name" | "age"
// - Si K = "age", alors T[K] = number
// - Si K = "name", alors T[K] = string
//
// Avantages:
// - Réutilisable avec n'importe quel type d'objet
// - Type-safe: TypeScript vérifie que key existe dans T
// - Type-safe: value doit correspondre au type de T[K]
// - Permet de créer des fonctions très flexibles et sûres

function filterBy<T, K extends keyof T>(arr: T[], key: K, op: string, value: T[K]): T[] {
  switch (op) {
    case '=':
      return arr.filter((item) => item[key] === value)
    case '>':
      return arr.filter((item) => item[key] > value)
    case '<':
      return arr.filter((item) => item[key] < value)
    default:
      throw new Error('Opérateur non supporté')
  }
}

// Définition du type User
type User = { id: number; name: string; age: number }

// Exemples d'utilisation
const users: User[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 30 },
]

console.log('filterBy(users, "age", "=", 30):', filterBy(users, 'age', '=', 30)) // ✅ OK
console.log('filterBy(users, "age", "<", 30):', filterBy(users, 'age', '<', 30)) // ✅ OK
console.log('filterBy(users, "name", "=", "Alice"):', filterBy(users, 'name', '=', 'Alice')) // ✅ OK

// ============================================================================
// SECTION 7: Fonction générique simple avec contrainte basique
// ============================================================================
//
// Syntaxe: function sum<T extends number | string>(...elements: T[]): number | string
//
// Concepts:
// - <T extends number | string>: T doit être un sous-type de number ou string
//   * Peut être: number, string, ou un type littéral comme 5 | 10 | 15
//
// Différence avec filterBy:
// - filterBy: Contrainte complexe (K extends keyof T) pour garantir une relation entre types
// - sum: Contrainte simple (T extends number | string) pour garantir que T est un nombre ou une string
//
// Pourquoi générique ici ?
// - Permet de préserver les types littéraux si nécessaire
// - Exemple: sum(5, 10) pourrait inférer T = 5 | 10 au lieu de number
// - Mais dans ce cas, le retour est toujours number | string (plus simple)

function sum<T extends number | string>(...elements: T[]): number | string {
  const hasString = elements.some((el) => typeof el === 'string')
  if (hasString) {
    // Concaténation si au moins une string est présente
    let temp: string = ''
    for (const el of elements) {
      temp += String(el)
    }
    return temp
  } else {
    // Addition si tous sont des nombres
    let temp: number = 0
    for (const el of elements) {
      temp += el as number
    }
    return temp
  }
}

// Exemples d'utilisation
console.log('sum(5, 10, 15, 20) =', sum(5, 10, 15, 20)) // ✅ Retourne: 50
console.log('sum("Hello ", "TypeScript") =', sum('Hello ', 'TypeScript')) // ✅ Retourne: "Hello TypeScript"

// ============================================================================
// SECTION 8: Surcharge de fonction
// ============================================================================
//
// La surcharge de fonction permet de définir plusieurs signatures pour une même fonction.
// Cela permet à TypeScript de comprendre différents cas d'utilisation et de fournir
// une meilleure inférence de type et autocomplétion.
//
// Syntaxe avec déclaration:
// declare function toArray<T>(value: T): T[]
// declare function toArray<T>(value: T[]): T[]
//
// L'implémentation doit gérer tous les cas de surcharge.

// Déclaration des surcharges (signatures multiples)
function toArray<T>(value: T): T[]
function toArray<T>(value: T[]): T[]
// Implémentation
function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

// Cette fonction accepte soit une valeur unique, soit un tableau,
// et retourne toujours un tableau.

// Exemples d'utilisation
console.log('toArray(5) =', toArray(5)) // [5]
console.log('toArray("hello") =', toArray('hello')) // ["hello"]
console.log('toArray([1, 2, 3]) =', toArray([1, 2, 3])) // [1, 2, 3]
console.log('toArray(["a", "b"]) =', toArray(['a', 'b'])) // ["a", "b"]

// ============================================================================
// SECTION 9: Les enums
// ============================================================================
//
// Les enums permettent de définir un ensemble de constantes nommées.
// Ils sont utiles pour représenter un groupe de valeurs fixes et liées.
//
// Caractéristiques:
// - Code plus lisible et maintenable
// - Autocomplétion dans l'IDE
// - Vérification de type à la compilation
// - Évite les erreurs de typo

// ----------------------------------------------------------------------------
// Enum numérique
// ----------------------------------------------------------------------------
//
// Par défaut, les enums sont numériques et commencent à 0.
// Chaque valeur suivante est incrémentée automatiquement.
//
// Note: Avec erasableSyntaxOnly activé, on utilise une alternative avec objet constant
// qui simule le comportement d'un enum numérique.

const StatusEnums = {
  Todo: 0,
  Doing: 1,
  Done: 2,
} as const

type StatusEnums = (typeof StatusEnums)[keyof typeof StatusEnums]

const s1: StatusEnums = StatusEnums.Todo
console.log('s1 (StatusEnums.Todo) =', s1) // Affiche: 0

// Exemples d'utilisation
console.log('StatusEnums.Doing =', StatusEnums.Doing) // 1
console.log('StatusEnums.Done =', StatusEnums.Done) // 2

// ----------------------------------------------------------------------------
// Enum string
// ----------------------------------------------------------------------------
//
// Les enums peuvent aussi être des strings.
// Ils sont plus lisibles et ne peuvent pas être inversés (pas de reverse mapping).
//
// Note: Avec erasableSyntaxOnly activé, on utilise une alternative avec objet constant
// qui simule le comportement d'un enum string.

const StatusStrEnums = {
  Todo: 'Todo',
  Doing: 'Doing',
  Done: 'Done',
} as const

type StatusStrEnums = (typeof StatusStrEnums)[keyof typeof StatusStrEnums]

const s2: StatusStrEnums = StatusStrEnums.Todo
console.log('s2 (StatusStrEnums.Todo) =', s2) // Affiche: "Todo"

// Exemples d'utilisation
console.log('StatusStrEnums.Doing =', StatusStrEnums.Doing) // "Doing"
console.log('StatusStrEnums.Done =', StatusStrEnums.Done) // "Done"

// ----------------------------------------------------------------------------
// Utilisation dans les fonctions
// ----------------------------------------------------------------------------

function isDone(status: StatusEnums): boolean {
  return status === StatusEnums.Done
}

// Exemples d'utilisation
console.log('isDone(StatusEnums.Todo) =', isDone(StatusEnums.Todo)) // false
console.log('isDone(StatusEnums.Doing) =', isDone(StatusEnums.Doing)) // false
console.log('isDone(StatusEnums.Done) =', isDone(StatusEnums.Done)) // true

// ============================================================================
// SECTION 10: Alternative moderne aux enums
// ============================================================================
//
// Une alternative moderne aux enums utilise des objets constants avec "as const"
// et des types union. Cette approche est recommandée dans les projets TypeScript
// modernes car elle offre les mêmes avantages que les enums avec moins de code généré.
//
// Syntaxe:
// const STATUS = { ... } as const
// type StatusUnion = (typeof STATUS)[keyof typeof STATUS]
//
// On crée un type à partir des valeurs de l'objet STATUS qui va fonctionner comme un enum.

const STATUS = {
  Todo: 'Todo',
  Doing: 'Doing',
  Done: 'Done',
} as const

// On crée un type à partir des valeurs de l'objet STATUS
// qui va fonctionner comme un enum
type StatusUnion = (typeof STATUS)[keyof typeof STATUS]

// StatusUnion est équivalent à: 'Todo' | 'Doing' | 'Done'

// ----------------------------------------------------------------------------
// Avantages de cette approche
// ----------------------------------------------------------------------------
//
// - Plus léger: Pas de code JavaScript généré (les enums génèrent du code)
// - Type-safe: TypeScript infère les types correctement
// - Flexibilité: Plus facile à étendre et modifier
// - Tree-shakable: Les bundlers peuvent mieux optimiser le code
// - Pas de reverse mapping: Plus prévisible et moins de surprises

// ----------------------------------------------------------------------------
// Utilisation
// ----------------------------------------------------------------------------

function checkStatus(status: StatusUnion): boolean {
  return status === STATUS.Done
}

// Exemples d'utilisation
console.log('checkStatus(STATUS.Todo) =', checkStatus(STATUS.Todo)) // false
console.log('checkStatus(STATUS.Doing) =', checkStatus(STATUS.Doing)) // false
console.log('checkStatus(STATUS.Done) =', checkStatus(STATUS.Done)) // true

// On peut aussi utiliser directement les valeurs string
console.log('checkStatus("Todo") =', checkStatus('Todo')) // false
console.log('checkStatus("Done") =', checkStatus('Done')) // true

// ============================================================================
// RÉSUMÉ
// ============================================================================
//
// Ce fichier couvre les concepts avancés de TypeScript:
//
// 1. Déclarations de fonctions: Classique vs fléchée avec annotations de type
// 2. Paramètres: Optionnels, valeurs par défaut, et paramètres rest
// 3. Contexte: Annotation explicite de "this"
// 4. Types: Union types vs "unknown" avec type guards
// 5. Génériques: Contraintes simples et complexes
// 6. Surcharge: Définir plusieurs signatures pour une fonction
// 7. Enums: Numériques et strings
// 8. Alternatives modernes: Objets constants avec "as const"
//
// Ces concepts permettent d'écrire du code TypeScript plus sûr, plus réutilisable
// et plus maintenable.
