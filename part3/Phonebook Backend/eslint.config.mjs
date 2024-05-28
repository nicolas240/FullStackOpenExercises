import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {ignores: ["node_modules/","dist/","mongo.js"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];