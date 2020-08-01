module.exports = {
  plugins: ['stylelint-scss'],
  ignoreFiles: [
    './node_modules/**/*.css',
    'resources/**/*.css',
  ],
  rules: {
    'prettier/prettier': [
      true,
      {
        singleQuote: true,
        tabWidth: 2,
      },
    ],
    indentation: 2,
    'string-quotes': 'single',
    'function-calc-no-invalid': true,
    'function-calc-no-unspaced-operator': true,
    'declaration-block-no-duplicate-properties': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'else',
          'for',
          'each',
          'include',
          'mixin',
          'content',
          'use',
          'forward',
          'return',
        ],
      },
    ],
  },
  extends: [,
    'stylelint-config-rational-order',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier',
    'stylelint-prettier/recommended',
    './node_modules/prettier-stylelint/config.js',
  ],
}
