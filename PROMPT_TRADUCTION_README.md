# Prompt pour traduire un README en fichier TypeScript

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

## README à traduire

[Insérer ici le contenu du README à traduire]
