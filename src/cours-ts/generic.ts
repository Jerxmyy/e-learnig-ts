// DIFFÉRENCE 1: Déclaration de fonction classique vs fonction fléchée typée
//
// Approche 1: Déclaration de fonction classique
// - Syntaxe: function nomFonction(paramètres): typeRetour { ... }
// - Avantage: Hoisting (la fonction est disponible avant sa déclaration)
// - Utilisation: Pour des fonctions réutilisables dans tout le scope
function add(a: number, b: number): number {
    return a + b
  }
  
  // Exemple d'utilisation
  console.log('add(5, 3) =', add(5, 3))
  
  // Approche 2: Fonction fléchée avec annotation de type explicite
  // - Syntaxe: const nomFonction: (paramètres) => typeRetour = (paramètres) => { ... }
  // - Différence: Le type est annoté AVANT la fonction, pas dans la signature
  // - Avantage: Plus explicite sur le type de la variable constante
  // - Note: Pas de hoisting, doit être déclarée avant utilisation
  const subtract: (a: number, b: number) => number = (a, b) => {
    return a - b
  }
  
  // Exemple d'utilisation
  console.log('subtract(10, 4) =', subtract(10, 4))
  
  // DIFFÉRENCE 2: Paramètre optionnel (b?: number) vs paramètre avec valeur par défaut (b = 10)
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
  const divide: (a: number, b?: number) => number = (a, b = 10) => {
    return a / b
  }
  
  divide(5)
  
  // DIFFÉRENCE 3: Paramètres rest (...numbers: number[])
  //
  // Syntaxe: ...nomParamètre: type[]
  // - Le "..." (spread operator) permet d'accepter un nombre indéfini de paramètres
  // - Tous les arguments sont regroupés dans un tableau
  // - Exemple: multiply(2, 3, 4, 5) → numbers = [2, 3, 4, 5]
  // - Utile pour des fonctions flexibles qui acceptent plusieurs valeurs
  function multiply(...numbers: number[]): number {
    console.log(numbers)
    return numbers.reduce((acc, val) => acc * val, 1)
  }
  console.log(multiply(2, 3, 4, 5))
  
  // DIFFÉRENCE 4: Annotation explicite de "this" en TypeScript
  //
  // Syntaxe: function nomFonction(this: Type, ...paramètres)
  // - TypeScript permet de typer explicitement le contexte "this"
  // - Utile pour garantir que la fonction est appelée avec le bon objet
  // - Doit être appelée avec .call(), .apply(), ou .bind() pour spécifier le contexte
  // - Différence avec JavaScript: TypeScript vérifie le type de "this" à la compilation
  type Counter = { val: number }
  
  function inc(this: Counter, step = 1): void {
    this.val += step
    console.log('Compteur: ', this.val)
  }
  
  const h: Counter = { val: 0 }
  // Note: On ne peut pas appeler inc(h) directement, il faut utiliser .call()
  inc.call(h)
  
  // DIFFÉRENCE 5: Union type (string | any[]) vs unknown avec type guards
  //
  // Approche 1: Union type explicite
  // - Syntaxe: paramètre: type1 | type2
  // - TypeScript sait que str est soit string, soit any[]
  // - Avantage: Type checking à la compilation, accès direct aux propriétés communes
  // - Limitation: Doit lister tous les types possibles à l'avance
  function len(str: string | any[]): number {
    return str.length
  }
  console.log('longueur de la chaine: ', len('Hello TS'))
  console.log('longueur du tableau: ', len([1, 2, 3, 4, 5]))
  
  // Approche 2: unknown avec type guards (vérifications de type)
  // - Syntaxe: paramètre: unknown + vérifications avec typeof/Array.isArray()
  // - Avantage: Plus flexible, accepte n'importe quel type
  // - Sécurité: TypeScript rétrécit le type après chaque vérification (type narrowing)
  // - Dans le if, TypeScript sait que x est string | any[]
  // - Différence clé: unknown force à vérifier le type avant utilisation
  function lenRefined(x: unknown): number {
    // Type guard: TypeScript comprend que si on passe ce if, x est string | any[]
    if (typeof x === 'string' || Array.isArray(x)) {
      return x.length // Ici, TypeScript sait que x.length existe
    }
    throw new Error('Type non supporte')
  }
  
  // Exemples d'utilisation
  console.log('lenRefined("Hello") =', lenRefined('Hello'))
  console.log('lenRefined([1, 2, 3]) =', lenRefined([1, 2, 3]))
  
  const myBoolean: boolean = true
  // console.log(lenRefined(myBoolean)); // provoque une erreur a l'execution
  // Note: TypeScript détecterait l'erreur à la compilation si on décommentait
  console.log('myBoolean =', myBoolean)
  
  // DIFFÉRENCE 6: Fonction générique avec contraintes complexes
  //
  // Syntaxe: function nomFonction<T, K extends keyof T>(...)
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
  
  let result = filterBy(users, 'age', '=', 30)
  console.log(result)
  
  result = filterBy(users, 'age', '<', 30)
  console.log(result)
  
  // DIFFÉRENCE 7: Fonction générique simple avec contrainte basique
  //
  // Syntaxe: function sum<T extends number>(...elements: T[]): number
  // - <T extends number>: T doit être un sous-type de number
  //   * Peut être: number, ou un type numérique comme 5 | 10 | 15 (literal types)
  // - Différence avec filterBy:
  //   * filterBy: Contrainte complexe (K extends keyof T) pour garantir une relation entre types
  //   * sum: Contrainte simple (T extends number) pour garantir que T est un nombre
  //
  // Pourquoi générique ici ?
  // - Permet de préserver les types littéraux si nécessaire
  // - Exemple: sum(5, 10) pourrait inférer T = 5 | 10 au lieu de number
  // - Mais dans ce cas, le retour est toujours number (plus simple)
  //
  // Alternative sans générique:
  // function sum(...elements: number[]): number { ... }
  // - Plus simple, mais perd l'inférence de types littéraux
 // exo: creer une fonction generique sum qui calcule la somme des elements passé en parametre
  
 function sum<T extends number | string>(...elements: T[]): number | string {
    if(typeof elements[0] === "number") {
      let temp = 0;
      for (const el of elements) {
        temp += el as number;
      }
      return temp;
    }
  
    let temp = "";
    for (const el of elements) {
      temp += el as string;
    }
    return temp;
  }
  
  console.log(sum(5, 10, 15, 20));
  console.log(sum("Hello ", "TypeScript ", "Generics!"));
  