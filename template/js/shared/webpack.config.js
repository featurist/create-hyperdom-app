/* eslint filenames/match-exported: 0 */

const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const mode = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development'

const plugins = [
  new WebpackManifestPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: mode,
    DEBUG: false
  }),
]

const filename = mode === 'production'
  ? '[name].[contenthash].bundle.js'
  : '[name].bundle.js'

const devtool = mode === 'production'
  ? 'source-map'
  : 'eval-source-map'

const entry = {
  app: './browser/index.js',
  registerServiceWorker: './browser/registerServiceWorker.js',
  serviceWorker: './browser/serviceWorker.js',
}

if (mode === 'production') {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  )
} else {
  entry.liveReload = './browser/liveReload.js'
}

const webpackConfig = {
  mode,
  devtool,
  entry,
  output: {
    publicPath: '',
    filename,
    path: path.resolve(__dirname, 'browser', 'dist')
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: 'dist'
          }
        }]
      }
    ]
  }
}

if (mode === 'production') {
  webpackConfig.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}

module.exports = webpackConfig
