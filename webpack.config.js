const path = require('path');

module.exports = {
    entry: './src',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'dss.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader?presets[]=latest&plugins[]=babel-plugin-add-module-exports' }
        ]
    },
    devtool: 'source-map'
};
