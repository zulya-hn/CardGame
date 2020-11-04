let path = require('path');
let webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDev = process.env.NODE_ENV !== 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/dist/';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: ASSET_PATH,
        filename: 'build.js'
    },
    devtool: isDev
        ? 'eval-source-map'
        : 'source-map',
    optimization: {
        minimize: isDev,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new CssMinimizerPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isDev
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img',
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
};
