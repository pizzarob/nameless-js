const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const server = {
    context: path.resolve(__dirname),
    entry: {
        server: './src/server/index.js',
    },
    output: {
        path: './build',
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'stage-2']
                }
            },
        ]
    },
    plugins: [
         new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
    ],
    externals: [nodeExternals({})],
}

const client = {
    entry: {
        client: './src/client/index.js',
    },
    output: {
        path: './build',
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'stage-2']
                }
            },
        ]
    },
}

module.exports = [client, server];
