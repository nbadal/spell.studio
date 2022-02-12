module.exports = {
    overrideWebpackConfig: ({ webpackConfig, pluginOptions: { test } }) => {
        const rule = { test, loader: 'raw-loader' };

        // rules[0] is 'pre'. insert at start of following rule set:
        webpackConfig.module.rules[1].oneOf.unshift(rule);
        return webpackConfig;
    },
};
