module.exports = {
  extends: 'react-app',

  plugins: [
    'flowtype'
  ],

  globals: {
    spyOn: true
  },

  rules: {
    'import/named': 'error',

    'flowtype/define-flow-type': 'warn',
    'flowtype/use-flow-type': 'warn',
    'flowtype/valid-syntax': 'warn',

    'flowtype/require-valid-file-annotation': [
      'error',
      'always',
      {
        'annotationStyle': 'line'
      }
    ],

    'flowtype/require-parameter-type': [
      'warn',
      {
        'excludeArrowFunctions': true
      }
    ],

    'flowtype/require-return-type': [
      'warn',
      'always',
      {
        'excludeArrowFunctions': true,
        'annotateUndefined': 'never'
      }
    ],

    'flowtype/space-after-type-colon': [
      'error',
      'always'
    ],

    'flowtype/space-before-type-colon': [
      'error',
      'never'
    ],

    'flowtype/type-id-match': [
      'off',
      '^([A-Z][a-z0-9]+)+Type$'
    ],
  }
}
