module.exports = {
  extends: ["next", "turbo", "airbnb", "airbnb-typescript", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    curly: "warn",
    eqeqeq: "error",
    "max-lines": ["warn", 500],
    "no-var": "error",
    "prefer-const": "error",
    "quote-props": ["warn", "as-needed"],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "variable",
        types: ["boolean", "string", "number", "array"],
        format: ["camelCase", "UPPER_CASE"],
      },
      { selector: "typeLike", format: ["PascalCase"] },
    ],
    "@typescript-eslint/no-magic-numbers": "warn",
    "@typescript-eslint/no-require-imports": "error",
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
};
