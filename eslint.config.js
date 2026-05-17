const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,

  {
    ignores: [
      "node_modules/**",
      ".expo/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "android/**",
      "ios/**",
    ],
  },

  {
    files: ["**/*.{ts,tsx}"],

    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      "no-duplicate-imports": "error",
    },
  },
]);
