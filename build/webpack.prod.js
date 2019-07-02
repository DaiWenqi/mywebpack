const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      ],
      optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
      },
    module: {
        rules: [{
            test: /\.png$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash].[ext]', // 打包后的名字 placeholder
                    outputPath: 'images',
                    limit: 10240 // url-loader 当图片小于10kb的时候，使用base64
                    // publicPath: 'assets/' 使用后assets/picture.png，发布后的路径
                }
            }]
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        //modules:true,    // 注意拼写 s 模块化css
                        importLoaders: 2 // 注意拼写 import
                    }
                },
                'sass-loader'
                , 'postcss-loader']
        }, {
            test: /\.(eot|ttf|woff|woff2|svg)$/,
            use: ['file-loader']
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'

        }]
    }
}

module.exports = merge(commonConfig, prodConfig);