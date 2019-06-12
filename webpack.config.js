const path = require('path');

module.exports = {
    entry:{
        main:'./src/index',// js 后缀可以省略
    },
    module:{
        rules:[{
            test:/\.png$/,
            use:'file-loader'
        }]
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}