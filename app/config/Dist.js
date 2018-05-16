'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackBaseConfig = require('./Base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

class WebpackDistConfig extends WebpackBaseConfig {
    constructor() {
        super()

        this.env = 'dist'
        this.config = {
            mode: 'production',
            entry: {
                vendor: ['react', 'react-dom', 'antd', 'mobx', 'mobx-react'],
                app: ['./src/index.js']
            },
            output: {
                path: path.resolve(__dirname, '../../electron/dist'),
                publicPath: '',
                chunkFilename: 'scripts/modules/[id].[chunkhash:16].js',
                filename: 'scripts/[name].[chunkhash:16].js'
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'initial',
                            test: 'vendor',
                            name: 'vendor',
                            enforce: true
                        }
                    }
                }
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'styles/[name].[contenthash:16].css'
                }),
                new HtmlWebpackPlugin({
                    template: 'index.ejs',
                    inject: 'body',
                    title: '平行世界De斑马',
                    minify: {
                        collapseWhitespace: true,
                        conservativeCollapse: true
                    }
                })
            ]
        }
    }
}

module.exports = WebpackDistConfig
