const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
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
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {loader: 'css-loader', options: {importLoaders: 1, minimize: true}},
          {loader: 'postcss-loader', options: {
            plugins: () => [
              autoprefixer()
            ],
            sourceMap: false
          }},
          'sass-loader'
        ]
      })
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
        {loader: 'html-loader', options: {minimize: true}}
      ]
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
  },
  entry: {
    app: `./${conf.path.src('index')}`,
    vendor: Object.keys(pkg.dependencies)
  }
};
