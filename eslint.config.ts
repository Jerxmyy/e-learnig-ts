// eslint.config.ts
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import vitest from "eslint-plugin-vitest";

export default [
  // 🔕 Dossiers ignorés (équiv. ignorePatterns)
  {
    ignores: ["dist", "coverage", "node_modules", "eslint.config.ts"],
  },

  // 🧠 Presets de base JS + TS (équiv. extends)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 🔧 Bloc commun (équiv. env, parserOptions, plugins, rules, settings)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module", // ← clé essentielle
      globals: { console: "readonly" },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      vitest,
    },
    settings: {
      // ≈ tes settings import/*
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/extensions": [".ts", ".tsx", ".js", ".jsx"],
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // ≈ tes rules
      "import/extensions": "off",
      "import/no-unresolved": [
        "error",
        { commonjs: true, caseSensitive: true },
      ],
      "prettier/prettier": "warn",
    },
  },

  // 🧪 Tests (équiv. overrides pour tests + globals Vitest)
  {
    files: ["tests/**/*.{test,spec}.ts"],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      "vitest/no-focused-tests": "error",
      "vitest/no-disabled-tests": "warn",
    },
  },
  {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        parser: "flow",
      },
    ],
  },
  // 🧼 Fin de config : désactive les règles en conflit avec Prettier
  eslintConfigPrettier,
];
