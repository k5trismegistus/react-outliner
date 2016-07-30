var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'example': './public/src/index.js',
    },
    output: {
        path: './public/dist/',
        filename: 'index.js'
    },
    devtool: 'source-map',
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin()
    // ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=react,presets[]=es2015'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=react,presets[]=es2015'
            }
        ]
    },
    resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
