var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    watch: true,

    entry: {
        'app': './src/app.ts'
    },

    output: {
        filename: './public/[name].js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development, 
            // ./public directory is being served 
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['public'] }
        })
    ],

    resolve: { extensions: ['.ts', '.tsx', '.js']},

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}
