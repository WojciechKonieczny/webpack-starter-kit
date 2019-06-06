const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');



module.exports = {
   entry: "./src/index.js",
   output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist")
   },

   module: {
      rules: [
         // LOADERS

         {
            test: /\.scss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                   publicPath: './',
                    publicPathRelativeToSource: true,
                  }
                },
               "css-loader", 
               {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [cssnano(), autoprefixer()]
                  }
                },
               "sass-loader"
            ]
         },

         {
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[ext]',
                  publicPath: './'
                }
              }
            ]
          },

         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
      ]
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html"
      }),

      new MiniCssExtractPlugin({
          filename: "style.css",
      }),

      new CopyPlugin([
         { from: './src/img', to: 'img' },
       ]),

  ]
};
