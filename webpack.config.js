const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 解构
const webpack = require('webpack');

// babel-loader : options
// 配置: 1
// {
//     'presets': [
//         ['@babel/preset-env',{
//         'useBuiltIns': 'entry',
//         'corejs': 3 ,
//         'targets': {
//             'chrome': '58',
//             'ie': '9'
//           }
//     }
//     ]]
// }
// 配置2
// {
//     'plugins': [
//       [
//         '@babel/plugin-transform-runtime',
//         {
//           'corejs': 2,
//           'helpers': true,
//           'regenerator': true,
//           'useESModules': false
//         }
//       ]
//     ]
//   }
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        open: 'Chrome', // 默认打开谷歌浏览器
        contentBase: path.join(__dirname, 'dist'),
        overlay: true, // 当错误发生时，打包工具的报错信息展示在浏览器上
        port: 1018,
        hot: true,
        // hotOnly:true
    },
    entry: {
        main: './src/index-main.js'// js 后缀可以省略
       // sub: './src/index',// js 后缀可以省略

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
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
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
            loader: 'babel-loader',
            // options:{
            //     'presets': [
            //         [
            //             '@babel/preset-env',
            //             {
            //                 'useBuiltIns': 'usage',
            //                 "corejs": 3,
            //                 "targets": {
            //                     "chrome": "58",
            //                     "ie": "8"
            //                   }
            //               }
            //         ]
            //     ]
            // }
            
        }]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'// 模版
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin() // HMR
    ]
}