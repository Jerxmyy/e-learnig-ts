# Prompt pour traduire le README #1 en fichier TypeScript

## Instructions

Tu es un professeur de TypeScript et tu dois traduire le README que je t'envoie en fichier TypeScript fonctionnel.

## Format attendu

Le fichier TypeScript doit suivre cette structure :

1. **Commentaires explicatifs** : Chaque section du README doit être traduite en commentaires TypeScript détaillés qui expliquent :
   - Le concept abordé
   - La syntaxe utilisée
   - Les caractéristiques et avantages
   - Les différences avec d'autres approches (si applicable)
   - Des notes importantes

2. **Code fonctionnel** : Après chaque section de commentaires, ajouter le code TypeScript correspondant qui :
   - Implémente le concept expliqué
   - Est exécutable et fonctionnel
   - Inclut des exemples d'utilisation avec `console.log()` pour démontrer le comportement
   - Respecte les bonnes pratiques TypeScript

## Structure du fichier

- Utiliser des commentaires de section avec `//` pour les titres principaux
- Utiliser des commentaires multi-lignes `//` pour les explications détaillées
- Organiser le code par sections correspondant aux sections du README
- Ajouter des exemples d'utilisation après chaque implémentation
- Le code doit être prêt à être exécuté dans un environnement TypeScript

## Exemple de format

```typescript
// SECTION 1: Titre de la section
//
// Explication détaillée du concept
// - Point important 1
// - Point important 2
// - Syntaxe: exemple de syntaxe
function exemple(...): type {
  // Implémentation
}

// Exemple d'utilisation
console.log('Résultat:', exemple(...))
```

## Contraintes

- Ne pas modifier le code existant du projet
- Créer un nouveau fichier TypeScript dans le dossier `src/cours-ts/`
- Le nom du fichier doit correspondre au sujet du README (ex: `generic.ts`, `functions.ts`, etc.)
- Tous les exemples du README doivent être implémentés et exécutables
- Le code doit compiler sans erreur TypeScript

---

## README à traduire

# Documentation TypeScript - Concepts Avancés

Ce document explique les concepts avancés de TypeScript présentés dans `generic.ts`.

## Table des matières

1. [Déclaration de fonction classique vs fonction fléchée typée](#1-déclaration-de-fonction-classique-vs-fonction-fléchée-typée)

2. [Paramètre optionnel vs valeur par défaut](#2-paramètre-optionnel-vs-valeur-par-défaut)

3. [Paramètres rest](#3-paramètres-rest)

4. [Annotation explicite de "this"](#4-annotation-explicite-de-this)

5. [Union type vs unknown avec type guards](#5-union-type-vs-unknown-avec-type-guards)

6. [Fonction générique avec contraintes complexes](#6-fonction-générique-avec-contraintes-complexes)

7. [Fonction générique simple avec contrainte basique](#7-fonction-générique-simple-avec-contrainte-basique)

8. [Surcharge de fonction](#8-surcharge-de-fonction)

9. [Les enums](#9-les-enums)

10. [Alternative moderne aux enums](#10-alternative-moderne-aux-enums)

---

## 1. Déclaration de fonction classique vs fonction fléchée typée

### Approche 1: Déclaration de fonction classique

**Syntaxe:**

```typescript

function nomFonction(paramètres): typeRetour { ... }

```

**Caractéristiques:**

- **Hoisting**: La fonction est disponible avant sa déclaration

- **Utilisation**: Pour des fonctions réutilisables dans tout le scope

**Exemple:**

```typescript
function add(a: number, b: number): number {
  return a + b
}
```

### Approche 2: Fonction fléchée avec annotation de type explicite

**Syntaxe:**

```typescript

const nomFonction: (paramètres) => typeRetour = (paramètres) => { ... }

```

**Caractéristiques:**

- Le type est annoté **AVANT** la fonction, pas dans la signature

- Plus explicite sur le type de la variable constante

- **Pas de hoisting**: Doit être déclarée avant utilisation

**Exemple:**

```typescript
const subtract: (a: number, b: number) => number = (a, b) => {
  return a - b
}
```

---

## 2. Paramètre optionnel vs valeur par défaut

**IMPORTANT:** Ce sont deux concepts différents en TypeScript !

### Dans la signature de type: `b?: number`

- Le `?` signifie que le paramètre est **OPTIONNEL**

- TypeScript sait que `b` peut être `undefined`

- L'appelant peut omettre le paramètre: `divide(5)`

### Dans l'implémentation: `b = 10`

- La valeur par défaut garantit que `b` aura toujours une valeur

- Si `b` n'est pas fourni, il prendra la valeur `10`

- Cela évite les erreurs d'exécution si on accède à `b`

### Pourquoi cette combinaison ?

- Le type dit "b est optionnel" (peut être omis)

- L'implémentation dit "si omis, utilise 10" (sécurité à l'exécution)

**Exemple:**

```typescript
const divide: (a: number, b?: number) => number = (a, b = 10) => {
  return a / b
}

divide(5) // b prendra la valeur 10
```

---

## 3. Paramètres rest

**Syntaxe:** `...nomParamètre: type[]`

**Caractéristiques:**

- Le `...` (spread operator) permet d'accepter un nombre indéfini de paramètres

- Tous les arguments sont regroupés dans un tableau

- Utile pour des fonctions flexibles qui acceptent plusieurs valeurs

**Exemple:**

```typescript
function multiply(...numbers: number[]): number {
  return numbers.reduce((acc, val) => acc * val, 1)
}

multiply(2, 3, 4, 5) // numbers = [2, 3, 4, 5]
```

---

## 4. Annotation explicite de "this"

**Syntaxe:** `function nomFonction(this: Type, ...paramètres)`

**Caractéristiques:**

- TypeScript permet de typer explicitement le contexte `this`

- Utile pour garantir que la fonction est appelée avec le bon objet

- Doit être appelée avec `.call()`, `.apply()`, ou `.bind()` pour spécifier le contexte

- **Différence avec JavaScript**: TypeScript vérifie le type de `this` à la compilation

**Exemple:**

```typescript
type Counter = { val: number }

function inc(this: Counter, step = 1): void {
  this.val += step

  console.log('Compteur: ', this.val)
}

const h: Counter = { val: 0 }

inc.call(h) // On ne peut pas appeler inc(h) directement
```

---

## 5. Union type vs unknown avec type guards

### Approche 1: Union type explicite

**Syntaxe:** `paramètre: type1 | type2`

**Caractéristiques:**

- TypeScript sait que le paramètre est soit `type1`, soit `type2`

- **Avantage**: Type checking à la compilation, accès direct aux propriétés communes

- **Limitation**: Doit lister tous les types possibles à l'avance

**Exemple:**

```typescript
function len(str: string | any[]): number {
  return str.length
}

len('Hello TS') // ✅ OK

len([1, 2, 3, 4, 5]) // ✅ OK
```

### Approche 2: unknown avec type guards

**Syntaxe:** `paramètre: unknown + vérifications avec typeof/Array.isArray()`

**Caractéristiques:**

- Plus flexible, accepte n'importe quel type

- **Sécurité**: TypeScript rétrécit le type après chaque vérification (type narrowing)

- **Différence clé**: `unknown` force à vérifier le type avant utilisation

**Exemple:**

```typescript
function lenRefined(x: unknown): number {
  // Type guard: TypeScript comprend que si on passe ce if, x est string | any[]

  if (typeof x === 'string' || Array.isArray(x)) {
    return x.length // Ici, TypeScript sait que x.length existe
  }

  throw new Error('Type non supporte')
}
```

---

## 6. Fonction générique avec contraintes complexes

**Syntaxe:** `function nomFonction<T, K extends keyof T>(...)`

### Concepts clés

- **`<T>`**: Type générique qui représente n'importe quel type

- **`<K extends keyof T>`**: `K` est contraint à être une clé de `T`
  - `keyof T` = union de toutes les clés de type `T`

  - `extends` = `K` doit être une sous-clé de `T`

- **`T[K]`**: Type de la valeur associée à la clé `K` dans `T` (indexed access type)

### Exemple avec User

- `T = User = { id: number; name: string; age: number }`

- `K` peut être: `"id" | "name" | "age"`

- Si `K = "age"`, alors `T[K] = number`

- Si `K = "name"`, alors `T[K] = string`

### Avantages

- Réutilisable avec n'importe quel type d'objet

- **Type-safe**: TypeScript vérifie que `key` existe dans `T`

- **Type-safe**: `value` doit correspondre au type de `T[K]`

**Exemple:**

```typescript
function filterBy<T, K extends keyof T>(arr: T[], key: K, op: string, value: T[K]): T[] {
  switch (op) {
    case '=':
      return arr.filter((item) => item[key] === value)

    case '>':
      return arr.filter((item) => item[key] > value)

    case '<':
      return arr.filter((item) => item[key] < value)

    default:
      throw new Error('Operateur non supporte')
  }
}

type User = { id: number; name: string; age: number }

const users: User[] = [
  { id: 1, name: 'Alice', age: 30 },

  { id: 2, name: 'Bob', age: 25 },

  { id: 3, name: 'Charlie', age: 30 },
]

filterBy(users, 'age', '=', 30) // ✅ OK

filterBy(users, 'age', '<', 30) // ✅ OK
```

---

## 7. Fonction générique simple avec contrainte basique

**Syntaxe:** `function sum<T extends number | string>(...elements: T[]): number | string`

### Concepts

- **`<T extends number | string>`**: `T` doit être un sous-type de `number` ou `string`
  - Peut être: `number`, `string`, ou un type littéral comme `5 | 10 | 15`

### Différence avec filterBy

- **filterBy**: Contrainte complexe (`K extends keyof T`) pour garantir une relation entre types

- **sum**: Contrainte simple (`T extends number | string`) pour garantir que `T` est un nombre ou une string

### Pourquoi générique ici ?

- Permet de préserver les types littéraux si nécessaire

- Exemple: `sum(5, 10)` pourrait inférer `T = 5 | 10` au lieu de `number`

**Exemple:**

```typescript
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

sum(5, 10, 15, 20) // ✅ Retourne: 50

sum('Hello ', 'TypeScript') // ✅ Retourne: "Hello TypeScript"
```

---

## 8. Surcharge de fonction

La surcharge de fonction permet de définir plusieurs signatures pour une même fonction.

**Syntaxe avec déclaration:**

```typescript
declare function toArray<T>(value: T): T[]

declare function toArray<T>(value: T[]): T[]
```

**Implémentation:**

```typescript
function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}
```

Cette fonction accepte soit une valeur unique, soit un tableau, et retourne toujours un tableau.

---

## 9. Les enums

Les enums permettent de définir un ensemble de constantes nommées.

### Enum numérique

Par défaut, les enums sont numériques et commencent à 0:

```typescript
enum StatusEnums {
  Todo, // 0

  Doing, // 1

  Done, // 2
}

const s1: StatusEnums = StatusEnums.Todo

console.log(s1) // Affiche: 0
```

### Enum string

Les enums peuvent aussi être des strings:

```typescript
enum StatusStrEnums {
  Todo = 'Todo',

  Doing = 'Doing',

  Done = 'Done',
}

const s2: StatusStrEnums = StatusStrEnums.Todo

console.log(s2) // Affiche: "Todo"
```

### Utilisation dans les fonctions

```typescript
function isDone(status: StatusEnums): boolean {
  return status === StatusEnums.Done
}
```

---

## 10. Alternative moderne aux enums

Une alternative moderne aux enums utilise des objets constants avec `as const` et des types union.

**Syntaxe:**

```typescript
const STATUS = {
  Todo: 'Todo',

  Doing: 'Doing',

  Done: 'Done',
} as const

// On crée un type à partir des valeurs de l'objet STATUS

// qui va fonctionner comme un enum

type StatusUnion = (typeof STATUS)[keyof typeof STATUS]
```

### Avantages de cette approche

- **Plus léger**: Pas de code JavaScript généré (les enums génèrent du code)

- **Type-safe**: TypeScript infère les types correctement

- **Flexible**: Plus facile à étendre et modifier

- **Tree-shakable**: Les bundlers peuvent mieux optimiser le code

### Utilisation

```typescript
// StatusUnion est équivalent à: 'Todo' | 'Doing' | 'Done'

function checkStatus(status: StatusUnion): boolean {
  return status === STATUS.Done
}
```

Cette approche est recommandée dans les projets TypeScript modernes car elle offre les mêmes avantages que les enums avec moins de code généré.

---

## Résumé

Ce document couvre les concepts avancés de TypeScript:

1. **Déclarations de fonctions**: Classique vs fléchée avec annotations de type

2. **Paramètres**: Optionnels, valeurs par défaut, et paramètres rest

3. **Contexte**: Annotation explicite de `this`

4. **Types**: Union types vs `unknown` avec type guards

5. **Génériques**: Contraintes simples et complexes

6. **Surcharge**: Définir plusieurs signatures pour une fonction

7. **Enums**: Numériques et strings

8. **Alternatives modernes**: Objets constants avec `as const`

Ces concepts permettent d'écrire du code TypeScript plus sûr, plus réutilisable et plus maintenable.
