const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    style: {
        postcssOptions: {
            plugins: [
                purgecss({
                    content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
                    safelist: [/Diamond/],
                }),
            ],
        },
    },
};
