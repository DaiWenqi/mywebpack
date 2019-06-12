const path = require('path');

module.exports = {
    entry:{
        main:'./src/index',// js 后缀可以省略
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
            use:['style-loader','css-loader','sass-loader','postcss-loader']
        }]
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}