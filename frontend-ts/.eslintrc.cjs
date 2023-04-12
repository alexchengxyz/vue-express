/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue-pug/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    'import/extensions': 0,
    'vue/comment-directive': 0,
    'no-unresolved': 'off',
    'import/no-unresolved': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 4,
      },
      multiline: {
        max: 1,
      },
    }],
    'object-curly-newline': ['off', 'never'], // 大括號內是否准許不必要的空格
    'no-underscore-dangle': 'off', // 不能以_開頭會結尾
    'no-restricted-syntax': ['error', 'FunctionExpression', 'WithStatement', "BinaryExpression[operator='in']"],
  },
};
