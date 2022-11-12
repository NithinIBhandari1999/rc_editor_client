// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        quotes: [
            'warn',
            'single'
        ],
        semi: [
            'warn',
            'always'
        ],
        'react/react-in-jsx-scope': 'off',
        '@next/next/no-img-element': 'off'
    }
};
