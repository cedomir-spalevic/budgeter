module.exports = {
   root: true,
   extends: ["@react-native-community", "airbnb-typescript", "prettier"],
   parserOptions: {
      project: "./tsconfig.json"
   },
   rules: {
      "react/destructuring-assignment": "off",
      "jsx-a11y/anchor-is-valid": "off"
   }
};
