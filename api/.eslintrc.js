module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'quotes': ['error', 'single'],
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    'prefer-const': ['error', {
      'destructuring': 'all',
      'ignoreReadBeforeAssign': false
    }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'error',
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always', { 'arraysInObjects': false }],
    '@typescript-eslint/type-annotation-spacing': ['error', { 'before': false, 'after': false, overrides: { colon: { before: false, after: true } } }],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }]
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ]
};