module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['static/**/*.js'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: true }],
  },
};
