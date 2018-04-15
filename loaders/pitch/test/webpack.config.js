const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './index.js',
    },
    output: {
        path: __dirname + '/dest',
        filename: '[name].js',
        publicPath:"/"
    },
    module: {
        rules: [{ test: /\.css$/, use: [require.resolve('../a'), require.resolve('../b'), require.resolve('../c')] }],
    },
};
