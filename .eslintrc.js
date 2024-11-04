module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
}
