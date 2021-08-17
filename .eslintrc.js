module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ["airbnb", "airbnb/hooks", "next/core-web-vitals", "prettier"],
  globals: {
    fetch: "readonly",
    document: "readonly",
  },
  ignorePatterns: ["projects/**/*"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/jsx-fragments": 0,
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "import/prefer-default-export": 0,
    // This is a Next.js issue with <Link>
    "jsx-a11y/anchor-is-valid": 0,
  },
};
