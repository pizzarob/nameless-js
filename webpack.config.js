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
    devtool: 'source-map',
    debug: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json',
            }
        ]
    },
    plugins: [
         new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
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
    devtool: 'source-map',
    debug: true,
    plugins: [
        // new CopyWebpackPlugin([
        //     { from: './src/assets/fonts', to: 'fonts' },
        // ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
        ]
    },
}

module.exports = [client, server];