module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['**/*.js', '**/*.ts', '**/*.vue'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: 'vue-eslint-parser',
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-multi-spaces': 0,
    '@typescript-eslint/dot-notation': ['error'],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    'padded-blocks': ['error', { blocks: 'never', switches: 'never' }],
    // 'no-tabs': 'off',
    semi: 'off',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-unused-vars': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
  },
}
