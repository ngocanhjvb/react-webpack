const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.WEBPACK_SERVE ? 'development' : 'production'

const VENDOR_LIBS = [
    "axios",
    "bootstrap",
    "file-loader",
    "jquery",
    "popper.js",
    "react",
    "react-dom",
    "react-redux",
    "react-router-dom",
    "redux",
    "redux-thunk",
    "lodash"
]

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS,
    },
    output: {
        filename: process.env.production ? '[name].[chunkhash].js' : '[name].[hash].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'something.css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader"
                },
                test: /\.js$/,
                exclude: '/node_module/' /// do not find in node_module for performance
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: "manifest",
        }
    },
    devServer: {
        port:4000,
        open:true
    }
}
