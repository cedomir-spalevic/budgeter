/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require("ts-jest/presets");

const nodeModulesToTransform = [
   "react-native",
   "react-navigation-tabs",
   "react-native-splash-screen",
   "react-native-screens",
   "react-native-reanimated",
   "react-native-secure-storage",
   "expo-local-authentication",
   "@unimodules",
   "react-native-notifications",
   "react-native-iphone-x-helper",
   "react-native-gesture-handler",
   "@react-navigation",
   "react-native-confirmation-code-field",
   "react-native-simple-dialogs",
   "react-native-date-picker",
   "react-native-vector-icons",
   "react-native-keyboard-accessory",
   "@react-native-picker",
   "react-native-root-siblings",
   "static-container"
]

module.exports = {
   preset: "react-native",
   transform: {
      ...tsjPreset.transform,
      "^.+\\.(js|jsx)$": "babel-jest"
   },
   globals: {
      "ts-jest": {
         babelConfig: true
      }
   },
   transformIgnorePatterns: [
      `node_modules/(?!(${nodeModulesToTransform.join("|")})/)`
   ],
   // This is the only part which you can keep
   // from the above linked tutorial"s config:
   cacheDirectory: ".jest/cache",
   moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx"
   ],
   setupFiles: [
      "./jestSetup.js"
   ]
};
