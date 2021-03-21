module.exports = {
  root: true,
  extends: [
    "eslint:recommended", 
    "plugin:@typescript-eslint/recommended",
    "plugin:react-native/all"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    "react-native/react-native": true
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native"
  ],
};
