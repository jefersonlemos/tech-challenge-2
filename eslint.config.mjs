import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "semi": ["error", "always"], // Exigir ponto e vírgula no final das declarações
      "quotes": ["error", "double"], // Exigir aspas duplas para strings
      "indent": ["error", 2], // Indentação de 2 espaços
      "no-unused-vars": "warn", // Aviso para variáveis não utilizadas
      "eqeqeq": ["error", "always"], // Exigir uso de === e !==
      "curly": "error", // Exigir uso de chaves em blocos
      "comma-dangle": ["error", "always-multiline"], // Exigir vírgula no final de listas multilinha
      "no-trailing-spaces": "error", // Proibir espaços em branco no final das linhas
      "eol-last": ["error", "always"], // Exigir uma linha em branco no final dos arquivos
      "no-multiple-empty-lines": ["error", { "max": 1 }], // Limitar linhas vazias consecutivas a 1
    },
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
];
