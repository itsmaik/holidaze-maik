import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ESLint options for TypeScript projects
  { ignores: ["dist"] },
  {
    // Extend recommended configurations from ESLint and TypeScript ESLint
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Apply this configuration to TypeScript files
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      // Set ECMAScript version for modern syntax support
      ecmaVersion: 2020,
      // Define browser globals to avoid "undefined" errors
      globals: globals.browser,
    },
    // Add additional plugins for React hooks and fast refresh support
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    // Define custom rules
    rules: {
      // Spread the recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Warn on non-exported components when using React Refresh,
      // but allow constant exports for more flexibility.
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
