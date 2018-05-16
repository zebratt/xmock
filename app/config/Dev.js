'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackBaseConfig = require('./Base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

class WebpackDevConfig extends WebpackBaseConfig {
    constructor() {
        super()

        this.env = 'dev'
        this.config = {
            mode: 'development',
            entry: {
                app: ['./src/index.js']
            },
            devtool: 'cheap-module-eval-source-map',
            devServer: {
                contentBase: this.srcPathAbsolute,
                port: 9527,
                inline: true,
                historyApiFallback: true,
                disableHostCheck: true,
                noInfo: false,
                stats: 'minimal'
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'styles/[name].[contenthash:16].css'
                }),
                new HtmlWebpackPlugin({
                    template: 'index.ejs',
                    inject: 'body',
                    title: '平行世界De斑马',
                    favicon: './src/images/favicon.ico',
                    minify: {
                        collapseWhitespace: true,
                        conservativeCollapse: true
                    }
                })
            ]
        }
    }
}

module.exports = WebpackDevConfig
