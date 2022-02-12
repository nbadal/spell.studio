const purgecss = require('@fullhuman/postcss-purgecss');
const importAsRaw = require('./plugin.raw');
const handlebarsBug = require('./plugin.handlebars-bug');

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
    plugins: [
        { plugin: handlebarsBug }, // https://github.com/handlebars-lang/handlebars.js/issues/1174
        // Make sure to add these to react-app-env.d.ts as well
        { plugin: importAsRaw, options: { test: /\.hbs$/i } },
        { plugin: importAsRaw, options: { test: /\.raw\.css$/i } },
    ],
};
