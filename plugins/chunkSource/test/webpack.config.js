const webpack = require('webpack');
const ChunkCreatePlugin = require('../index');

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
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
    },
    // plugins: [new ChunkCreatePlugin()],
};
