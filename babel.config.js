module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "babel-plugin-root-import",
      {
        rootPathPrefix: "~",
        rootPathSuffix: "src"
      }
    ],
    [
      "module-resolver",
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".android.js",
          ".android.tsx",
          ".ios.js",
          ".ios.tsx",
          ".svg"
        ],
        "root": [
          "./src"
        ],
        "alias": {
          "components": "./src/components",
          "context": "./src/context",
          "modules": "./src/modules",
          "services": "./src/services",
          "styles": "./src/styles"
        }
      }
    ]
  ]
};
