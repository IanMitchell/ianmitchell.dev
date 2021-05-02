module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ["airbnb", "airbnb/hooks", "prettier", "prettier/react"],
  globals: {
    fetch: "readonly",
    document: "readonly",
  },
  ignorePatterns: ["projects/**/*"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/jsx-fragments": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "import/prefer-default-export": 0,
  },
};
