const baseconfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = merge(baseconfig, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "build.html",
      title: "html title"
    })
  ],
});
module.exports = config
