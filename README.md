# Guide TypeScript - Plateforme E-Learning

Une plateforme web interactive pour apprendre TypeScript avec des exemples de code exécutables dans des sandbox.

## 🎯 Vision du Projet

Cette application est conçue pour devenir une **plateforme complète de e-learning** pour TypeScript. L'interface actuelle est la première étape d'un système plus vaste qui inclura :

- **Suivi de progression** : Suivi personnalisé de l'avancement de chaque apprenant à travers les différents concepts
- **Système d'exercices** : Exercices interactifs avec validation automatique et retour de résultats
- **Backend dédié** : Gestion centralisée des utilisateurs, progression, exercices et statistiques
- **Expérience utilisateur enrichie** : Tableaux de bord, badges, certifications et recommandations personnalisées

## 🚀 Fonctionnalités Actuelles

- **Sandbox interactifs** : Chaque concept TypeScript dispose d'un sandbox avec le code source
- **Exécution de code** : Exécutez les exemples de code et voyez les résultats en temps réel
- **Logs détaillés** : Affichage des logs avec coloration syntaxique
- **Syntax highlighting** : Mise en évidence du code TypeScript
- **Interface moderne** : Design sombre et responsive

## 🔮 Fonctionnalités Prévues

- **Authentification utilisateur** : Système de connexion/inscription géré par le backend
- **Suivi de progression** : Sauvegarde automatique de l'avancement dans chaque concept
- **Exercices interactifs** : Exercices avec validation automatique et feedback immédiat
- **Correction automatique** : Le backend évalue les solutions et retourne les résultats
- **Statistiques personnelles** : Visualisation de la progression, temps passé, concepts maîtrisés
- **Système de badges** : Récompenses pour la complétion de modules et exercices
- **Recommandations** : Suggestions de concepts à étudier basées sur la progression

## 📋 Prérequis

- Node.js >= 20.0.0 < 25.0.0
- npm ou yarn

## 🛠️ Installation

```bash
# Installer les dépendances
npm install
```

## 🏃 Développement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Build pour la production

```bash
# Construire l'application
npm run build

# Prévisualiser la build de production
npm run preview
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 📦 Déploiement

### Vercel

1. Installez Vercel CLI : `npm i -g vercel`
2. Déployez : `vercel`
3. Suivez les instructions

### Netlify

1. Installez Netlify CLI : `npm i -g netlify-cli`
2. Déployez : `netlify deploy --prod`
3. Configurez le build command : `npm run build`
4. Configurez le publish directory : `dist`

### GitHub Pages

1. Ajoutez dans `vite.config.ts` :

```typescript
export default defineConfig({
  base: '/votre-repo-name/',
  // ...
})
```

2. Créez un workflow GitHub Actions (`.github/workflows/deploy.yml`) :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Autres plateformes

L'application génère des fichiers statiques dans `dist/` qui peuvent être servis par n'importe quel serveur web statique.

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec UI
npm run test:ui

# Coverage
npm run coverage
```

## 📝 Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser la build de production
- `npm test` - Exécuter les tests
- `npm run test:watch` - Tests en mode watch
- `npm run lint` - Linter le code
- `npm run lint:fix` - Corriger automatiquement les erreurs de linting
- `npm run format` - Formater le code
- `npm run typecheck` - Vérifier les types TypeScript
- `npm run verify` - Exécuter tous les checks (typecheck, lint, test)

## 📁 Structure du projet

```
TSGuide/
├── src/
│   ├── cours-ts/          # Fichiers de cours TypeScript
│   │   ├── inference.ts
│   │   ├── generic.ts
│   │   └── ...
│   ├── lib/
│   │   ├── sandbox.ts     # Système de sandbox
│   │   └── utils.ts
│   ├── main.ts            # Point d'entrée de l'application
│   └── style.css          # Styles CSS
├── test/                  # Tests
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🔌 Architecture Future

### Frontend (Actuel)

- Interface utilisateur interactive
- Sandbox d'exécution de code
- Affichage des cours et exemples

### Backend (À venir)

- **API REST** : Gestion des utilisateurs, progression, exercices
- **Base de données** : Stockage des profils, progression, solutions d'exercices
- **Système d'évaluation** : Validation automatique des exercices TypeScript
- **Authentification** : JWT, OAuth, gestion des sessions
- **Analytics** : Suivi des performances et statistiques d'apprentissage

## 🎯 Concepts couverts

- Inférence de Type
- Fonctions Génériques
- Void et Never
- Enums
- Types d'Objets
- Dictionnaires
- Fonctions
- Types Utilitaires
- Readonly
- Pick et Omit

## 🔧 Technologies utilisées

- **TypeScript** - Langage de programmation
- **Vite** - Build tool et serveur de développement
- **Vitest** - Framework de tests
- **ESLint** - Linter
- **Prettier** - Formateur de code

## 🛣️ Roadmap

### Phase 1 : Interface de base (✅ Actuelle)

- [x] Interface utilisateur avec navigation
- [x] Sandbox interactifs
- [x] Exécution de code en temps réel
- [x] 10 concepts TypeScript de base

### Phase 2 : Backend et Authentification (🔄 À venir)

- [ ] API REST pour la gestion des utilisateurs
- [ ] Système d'authentification
- [ ] Base de données pour stocker la progression
- [ ] Intégration frontend-backend

### Phase 3 : Exercices et Progression (📋 Planifié)

- [ ] Système d'exercices avec validation automatique
- [ ] Suivi de progression par utilisateur
- [ ] Dashboard de statistiques personnelles
- [ ] Système de badges et récompenses

### Phase 4 : Fonctionnalités Avancées (💡 Idées)

- [ ] Recommandations personnalisées
- [ ] Mode hors-ligne
- [ ] Export de certificats
- [ ] Communauté et partage de solutions

## 📄 Licence

Ce projet est un projet éducatif.

## 🤝 Contribution

Les contributions sont les bienvenues ! Ce projet évolue vers une plateforme complète de e-learning, et toute aide est appréciée.

## 📧 Contact

Pour toute question, n'hésitez pas à nous contacter.
