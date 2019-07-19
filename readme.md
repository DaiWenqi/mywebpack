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
安装
```js
npm i -D express webpack-dev-middleware
```
 参考[server.js](./server.js)
 ### hot module replacement( hmr)
 默认支持css的hmr，js需要自己进行配置。
 ```js
 devServer: {
      contentBase: './dist',
+     hot: true
    }

     plugins: [
         ...
        new webpack.HotModuleReplacementPlugin()
     ]
 ```
### 使用 Babel 处理 ES6 语法
安装
```js
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev
```
package.json
```js
module: {
  rules: [
    { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        options: ["@babel/preset-env"]
    }
  ]
}
```
> 为了兼容 Promise Map ... 需要额外加入polyfill，7.40+已经启用，现在用 corejs 替代
**法一 presets**
```js
{
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader",
            options:{
                "presets": [
                    ["@babel/preset-env",{
                    "useBuiltIns": "usage",
                    "corejs": 3 
                }
                ]]
            }
```
需要使用的文件，最上面加上：
```js
import "@babel/polyfill";
```
**法二 plugins**
安装
```js
npm install --save @babel/runtime-corejs2
```
.babelrc
```js
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```
### 使用 Babel 打包 react
安装
```js
npm i react react-dom --save
npm install --save-dev @babel/preset-react
```
配置
```js
{
  "presets": ["@babel/preset-react"]
}
```
代码
```js
import 'core-js';

import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return <div>Hello World!</div>
    }
}

ReactDom.render(<App />, document.getElementById('root'));

```
### Tree Shaking 
配置
webpack.config.js
```js
mode: production
```
sideEffects: 排除
```js
"sideEffects":["*.css"]
```

### webpack 按环境区分
```js
npm install webpack-merge -D
```

### Code Splitting
webpack.config.js
```js
...
optimization: {
	splitChunks: {
    	chunks: 'all'
    }
}
...

```
默认值
```js
optimization: {
    splitChunks: {
      chunks: 'async',// 只对异步代码分割 all 
      minSize: 30000,// 
      maxSize: 0,
      minChunks: 1,// 使用 1 次的模块进行分割
      maxAsyncRequests: 5,
      maxInitialRequests: 3,// 入口最多分割成 3 个
      automaticNameDelimiter: '~',// 连接符号
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,// 值越大，优先级越高
          filename:'vendors.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true，// 如果 使用的模块其他模块用过，就不会再忽略这个模块
          filename:'common.js'
        }
    }
}
```

### shim jquery
使用插件, 当页面遇到 $ 符号的时候，会自动在头部引用 import $ from 'jqury';
```js
new webpack.ProvidePlugin({
    $: 'jqurey'
})
```

### 修改模块 this == window
使用 imports-loader ,先安装。。
配置
```js
loader: 'imports-loader?this=>window'
```