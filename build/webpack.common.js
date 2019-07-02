const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 解构

module.exports = {
    entry: {
        main: './src/index-main.js'// js 后缀可以省略
        // sub: './src/index',// js 后缀可以省略
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'// 模版
        }),
        new CleanWebpackPlugin()
    ],optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                venders: false,
                default: false
            }
        }
    }
}
