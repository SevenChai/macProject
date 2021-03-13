const { Hash } = require('crypto');
const path = require('path');
module.exports = {
  //context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [
          {
            //把解析后的css插入到<header>中
            loader: 'style-loader'
          },
          {
            //解析.css文件
            loader: 'css-loader'
          },
          
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [              
          {
            loader: 'url-loader',
            options: {
              limit: 28*1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name]=[hash:8].[ext]',
                  //publicPath: './assets',
                  outputPath: 'assets'
                }              
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};