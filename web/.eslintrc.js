module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:import/typescript',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'implicit-arrow-linebreak': 'off',

        // Consider changing:
        'no-use-before-define': 'off',
        'no-param-reassign': 'off',
        'no-console': 'off',
        'import/prefer-default-export': 'off',
        'react/destructuring-assignment': 'off',

        // Fix for CRA's setupTests.ts for jest
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: ['**/setupTests.ts', '**/craco.config.js'],
        }],

        // Fix TS import extension requirements
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        }],

        // Allow JSX in TSX files
        'react/jsx-filename-extension': ['error', {
            extensions: ['.jsx', '.tsx'],
        }],

        // Fix for unused import false positive:
        'no-unused-vars': 'off', // off the eslint core rule.
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

        // Use typescript no-shadow:
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
    },
    overrides: [{
        files: ['**/__tests__/*'],
        env: {
            jest: true,
        },
    }],
};
