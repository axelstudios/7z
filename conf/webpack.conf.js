const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [{
      test: /\.json$/,
      loaders: [
        'json-loader'
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    }, {
      test: /\.(css|scss)$/,
      exclude: /node_modules/,
      loaders: [
        {loader: 'style-loader', options: {sourceMap: true}},
        {loader: 'css-loader', options: {importLoaders: 1, sourceMap: true}},
        {loader: 'postcss-loader', options: {
          plugins: () => [
            autoprefixer()
          ],
          sourceMap: true
        }},
        {loader: 'sass-loader', options: {sourceMap: true}}
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'ng-annotate-loader',
        'babel-loader'
      ]
    }, {
      test: /\.html$/,
      loaders: [
        'html-loader'
      ]
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  entry: `./${conf.path.src('index')}`
};
