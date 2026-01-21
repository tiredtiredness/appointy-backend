import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["src/generated/**/*"] },
  eslintPluginUnicorn.configs["recommended"],
  {
    files: ["**/*.{js,ts}"],
    ignores: ["**/*.js", "dist/**/*", "node_modules/**/*"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unicorn/better-regex": "warn",
      "unicorn/no-process-exit": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-single-quote": "off",
    },
  },
  {
    files: ["src/**/*.test.{js,ts}"],
    ...vitest.configs.recommended,
  },
  eslintPluginPrettierRecommended,
]);
