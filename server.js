const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const app = express();

app.use(webpackDevMiddleware(compiler, {

}));

app.listen(3000, () => {
    console.log('serve is running！')
})

