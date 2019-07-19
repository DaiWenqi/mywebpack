const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 解构
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/template.html'// 模版
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
];

// 返回文件名数组 string[]
const files = fs.readdirSync(path.resolve(__dirname,'../dll'));
console.log(files);

files.forEach(file => {// 注意下面的 plugin 有顺序的
    // 插入 html 页面
    if(/.*\.dll.js/.test(file)){
        plugins.push(new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll', file)
        }))
    }
    // 引用 manifest
    if(/.*\.dll.json/.test(file)){
        plugins.push(new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll', file)
        }))
    }
})

module.exports = {
    entry: {
        main: './src/index-main.js',// js 后缀可以省略
        // sub: './src/index',// js 后缀可以省略
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        filename: '[name]-[contenthash].js',
        chunkFilename: '[id]-[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins,
    optimization: {
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
