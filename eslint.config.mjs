// eslint.config.mjs — config d'audit sécurité (ESLint 9 flat config)
import js from "@eslint/js";
import security from "eslint-plugin-security";
import react from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser"; // <-- AJOUT de la LIGNE

export default [
  {
    // 1) On n'analyse pas les dossiers générés
    ignores: ["node_modules/**", ".next/**", "next-env.d.ts"],
  },
  // 2) Règles JS de base
  js.configs.recommended,
  // 3) Le plugin sécurité sur tout le code TS/TSX
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser, // <-- AJOUT d'une nouvelle CONFIGURATION
    },
    plugins: { security, react },
    rules: {
      // active les règles "sécurité"
      ...security.configs.recommended.rules,
      // la règle clé : interdit dangerouslySetInnerHTML
      "react/no-danger": "error",
    },
  },
];