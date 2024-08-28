js = require("@eslint/js");
globals = require("globals");
//import globals from "globals";
typescriptEslintParser = require("@typescript-eslint/parser");
// import typescriptEslintParser from "@typescript-eslint/parser";

module.exports = [
  //js.configs.recommended,

  {
    languageOptions: {
      //ecmaVersion: 2020,
      sourceType: "module",
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        require: true,
        process: true,
      },
      //project: ["./tsconfig.json"],
    },
    files: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
    rules: {
      //"no-unused-vars": "error",
      "no-undef": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-explicit-any": "off",
      //"@typescript-eslint/no-shadow": "error",
    },
    ignores: [
      "src/serviceWorker*.js",
      "src/**/*test.js",
      "src/App.test*.js",
      "**/tests/",
    ],
  },
];
