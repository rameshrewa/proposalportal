module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
  ],
  parser: "babel-eslint",
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["prettier"],
  rules: {
    // "prettier/prettier": "error",
    "jsx-quotes": ["error", "prefer-double"],
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    camelcase: "off",
    "new-cap": "warn",
    "no-eval": "warn",
    "import/prefer-default-export": "warn",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.stories.*", "**/*.spec.js"] },
    ],
    "no-case-declarations": "warn",
  },
  noInlineConfig: true,
  reportUnusedDisableDirectives: true,
  ignorePatterns: [
    "**/node_modules/**",
    "**/static/**",
    "**/public/**",
    "**/.cache/**",
    "**/__stories__/**",
  ],
};
