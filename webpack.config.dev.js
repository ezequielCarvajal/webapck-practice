const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css
const CopyPlugin = require('copy-webpack-plugin'); //copiar archivos o carpetas a dist
// OPTIMIZE:
// const CssMinizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {

    entry: './src/index.js',
    output: {
        // path: __dirname + '/build',
        path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
      extensions: ['.js'],
      alias: {
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@templates': path.resolve(__dirname, 'src/templates/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@images': path.resolve(__dirname, 'src/assets/images/'),
      }
    },
    // devServer: {
    //   port: 3000
    // },
    module: {
        rules:[
          {
            test: /\.m?js$/, // /\.(css)$/,   // test:/\.(scss)$/ para trabajar con sass
            exclude: /node_modules/,
             use: {
               loader: 'babel-loader'
             }
           },
             {
               test: /\.css|\.styl$/i, // /\.css|.stylus$/i,
               use: [ MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'], //css
             },
             // [ "style-loader", "css-loader"],
            //  {loader: 'sass-loader'}
            {
              test: /\.png/,
              type: 'asset/resource'
            },
            // {
            //   test: /\.(woff|woff2)$/,
            //   use: {
            //     loader: 'url-loader',
            //     options: {
            //       limit: 10000,
            //       mimitype: "application/font-woff",
            //       name: "[name][contenthash].ext",
            //       outputPath: "./assets/fonts/",
            //       publicPath: "./assets/fonts/",
            //       esModule: false,
            //     }
            //   }
            // }
       ]
      },
      plugins: [
        new HTMLWebpackPlugin({
          inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].[contenthash].css'
        }), //css
        new CopyPlugin({
          patterns:[
            {
              from: path.resolve(__dirname, "src", "assets/images"),
              to: "assets/images"
            }
          ]
        }),
        new Dotenv(),
      ],
      // para production -->
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new CssMinizerPlugin(),
    //     new TerserPlugin(),
    //   ]
    // }
}
