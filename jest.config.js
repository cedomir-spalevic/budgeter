/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "react-native",
  transform: {
    ...tsjPreset.transform,
    "\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
    }
  },
  // This is the only part which you can keep
  // from the above linked tutorial"s config:
  cacheDirectory: ".jest/cache",
};