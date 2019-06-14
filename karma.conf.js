// var webpack = require("webpack");
module.exports = (config) => {
    config.set({
        frameworks: ['jasmine'],
        // ... normal karma configuration
        files: [
            // all files ending in "_test"
            { pattern: 'test/*.js', watched: false },
            { pattern: 'test/*_test.js', watched: false },
            { pattern: 'test/**/*_test.js', watched: false },
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'test/*.js': ['webpack'],
            'test/**/*.js': ['webpack'],
            'test/*_test.js': ['webpack'],
            'test/**/*_test.js': ['webpack'],
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies
            // webpack configuration
            module: {
                /* Transpile source and test files */
                rules: [{
                    test: /\.jsx?$/,
                    use: "babel-loader",
                }]
            }
        },
        colors: true,
        autoWatch: true,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only',
        },
    });
};