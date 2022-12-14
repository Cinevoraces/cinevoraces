module.exports = {
  plugins: ['@typescript-eslint'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'quotes': ['error', 'single'],
    'semi': 'off',
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-for-of': 'warn',
    'prefer-const': ['error', {
      'destructuring': 'all',
      'ignoreReadBeforeAssign': false
    }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'warn',
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['warn', { before: false, after: true }],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['warn', 'never'],
    'indent': 'off',
    '@typescript-eslint/indent': ['warn', 2],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['warn', { before: true, after: true }],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always', { 'arraysInObjects': false }],
    '@typescript-eslint/type-annotation-spacing': ['warn', { 'before': true, 'after': true, overrides: { colon: { before: false, after: true } } }],
    "@typescript-eslint/no-namespace": "off",
    'no-multi-spaces': ['error'],
    "eol-last": ["error", "always"],
    'no-multiple-empty-lines': ['warn', { max: 1 }]
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ]
};