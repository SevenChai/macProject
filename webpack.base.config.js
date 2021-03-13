const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//https://stylelint.io/user-guide/configure
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./index.js"
  },
  output: {
    filename: "[name][contenthash:8].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 28 * 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "[name]=[hash:8].[ext]",
                  //publicPath: './assets',
                  outputPath: "assets"
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "common.css"
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".vue", ".ts"]
  }
};
