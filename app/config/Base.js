'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

class WebpackBaseConfig {
    constructor() {
        this._config = {}
    }

    set config(data) {
        this._config = Object.assign({}, this.defaultSettings, data)
        return this._config
    }

    get config() {
        return this._config
    }

    get srcPathAbsolute() {
        return path.join(__dirname, '../src')
    }

    get defaultSettings() {
        return {
            context: path.resolve(__dirname, '..'),
            module: {
                rules: [
                    {
                        test: /\.(js|jsx|ts|tsx)$/,
                        include: [this.srcPathAbsolute],
                        loader: ['babel-loader']
                    },
                    {
                        test: /\.tsx?$/,
                        include: [this.srcPathAbsolute],
                        use: ['ts-loader']
                    },
                    {
                        test: /\.css$/,
                        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
                    },
                    {
                        test: /\.pcss$/,
                        use: [
                            { loader: MiniCssExtractPlugin.loader },
                            {
                                loader: this.env === 'dev' ? 'typings-for-css-modules-loader' : 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: true,
                                    namedExport: true,
                                    camelCase: true,
                                    minimize: true,
                                    localIdentName: '[local]_[hash:base64:5]'
                                }
                            },
                            'postcss-loader'
                        ]
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        query: {
                            limit: '8192',
                            name: 'images/[name].[hash:16].[ext]'
                        }
                    }
                ]
            },
            externals: [
                (() => {
                    const IGNORES = ['electron']
                    return (context, request, callback) => {
                        if (IGNORES.indexOf(request) >= 0) {
                            return callback(null, "require('" + request + "')")
                        }
                        return callback()
                    }
                })()
            ],
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.pcss'],
                alias: {
                    '@src': this.srcPathAbsolute
                }
            }
        }
    }
}

module.exports = WebpackBaseConfig
