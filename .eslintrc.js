module.exports = {
   root: true,
   parser: "@typescript-eslint/parser",
   plugins: ["@typescript-eslint", "react"],
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended"
   ],
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      }
   },
   rules: {
      "react/prop-types": "off",
      "react/display-name": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-non-null-assertion": "off" // This is until I can figure out a better way to set default context values
   }
};
