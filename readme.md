# webpack学习

> Let's do it!

## 使用 url-loader 打包图片

npm i -D file-loader

**webpack.config.js**

```js
    rules:[  
        test:/\.png$/,  
        use:[{  
            name:'[name]-[hash].[ext]', // 打包后的名字加上hash  
            outputPath: 'images', // 打包后文件都放在images文件夹中  
            loader:'file-loader',  
            options:{  
            limit:'1024' // 小于1kb的就使用base64  
            }  
        }]  
    }]  
```

**package.json**

```js
    {
        ...
        "browserslist": [
            "last 2 version",
            "not dead",
            "iOS >= 9"
        ],
        "postcss": {
            "plugins": {
            "autoprefixer": {}
            }
        },
        ...
    }
```

## 使用 file-loader 打包字体文件

**webpack.config.js**

```js
    {
            test: /\.(eot|ttf|woff|woff2|svg)$/,
            use:['file-loader']
        }
```

## 打包scss（模块化css）

```js
npm install 
postcss-loader  
sass-loader 
node-sass 
style-loader 
css-loader
autoprefixer  
--save-dev
```

**webpack.config.js**

```js
...
{
    test: /\.scss$/,
    use:['style-loader','css-loader','sass-loader','postcss-loader']
}
...
    loader:'css-loader',
    options:{
        modules:true,    // 注意拼写 
        importLoaders:2 // 注意拼写 import
    }
...

## plugins : html-webpack-plugin, clean-webpack-plugin
**安装**
**webpack.config.js**
```js
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 注意这里的结构

    ...
    plugins: [new HtmlWebpackPlugin({
         template:'./src/index.html'
    }),new CleanWebpackPlugin()]
    ...
```

## source-map 配置

```js
devtool:source-map
```

### development最佳
devtool:`cheap-module-eval-source-map`
### production 最佳
devtoo:`cheap-module-source-map`

## 自动化打包
### watch
**package.json**
```js
scripts: {
    "watch": "webpack --watch"
}
```

### devServer
安装
```js
npm i -D webpack-dev-server
```
**package.json**
```js
scripts: {
    "watch": "webpack-dev-server"
}
```
**webpack.config.js**
```js
scripts: {
    "contentBase": "./dist"
}
```
### 自定义server( 使用中间件)
 参考[server.js](./server.js)

