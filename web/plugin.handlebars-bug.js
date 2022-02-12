module.exports = {
    overrideWebpackConfig: ({ webpackConfig }) => {
        webpackConfig.resolve.alias.handlebars = 'handlebars/dist/cjs/handlebars';
        return webpackConfig;
    },
};
