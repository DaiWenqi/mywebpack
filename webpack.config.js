const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 解构
module.exports = {
    devtool:"source-map",
    entry:{
        entry:'./src/index',// js 后缀可以省略
    },
    module:{
        rules:[{
            test:/\.png$/,
            use:[{
                loader:'url-loader',
                options:{
                    name:'[name]-[hash].[ext]', // 打包后的名字 placeholder
                    outputPath: 'images',
                    limit: 10240 // url-loader 当图片小于10kb的时候，使用base64
                    // publicPath: 'assets/' 使用后assets/picture.png，发布后的路径
                }
            }]
        },{
            test: /\.css$/,
            use:['style-loader','css-loader']
        },{
            test: /\.scss$/,
            use:[
                'style-loader',
                {
                    loader:'css-loader',
                    options:{
                        //modules:true,    // 注意拼写 s 模块化css
                        importLoaders:2 // 注意拼写 import
                    }
                },
                'sass-loader'
                ,'postcss-loader']
        },{
            test: /\.(eot|ttf|woff|woff2|svg)$/,
            use:['file-loader']
        }]
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}