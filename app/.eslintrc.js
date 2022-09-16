module.exports = {
  plugins: ['@typescript-eslint'],
  rules: {
    '@next/next/no-img-element': 'off',
    'quotes': ['warn', 'single'],
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-for-of': 'warn',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'warn',
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['warn', { before: false, after: true }],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['warn', 'never'],
    'indent': 'off',
    '@typescript-eslint/indent': ['warn', 2],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['warn', { before: false, after: true }],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always', { 'arraysInObjects': false }],
    '@typescript-eslint/type-annotation-spacing': ['warn', { 'before': false, 'after': false, overrides: { colon: { before: false, after: true } } }],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['warn', { max: 1 }]
  },
  extends: ['next/core-web-vitals', 'prettier']
};