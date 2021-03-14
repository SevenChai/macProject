const baseconfig = require("./webpack.base.config");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const config = merge(baseconfig, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: true
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000/src/json",
        pathRewrite: { "^/api": "" }
      },
    }
  }
});
module.exports = config;
