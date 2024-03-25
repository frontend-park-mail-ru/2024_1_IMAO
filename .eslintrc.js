module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'ignorePatterns': ['*.precompiled.js', '**/handlebars/*.js'],
  'rules': {
    'semi': ['error', 'always'],
    // 'no-console': 'error',
  },
  'plugins': [
    'prettier',
  ],
};
