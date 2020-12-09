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
  app: './browser/index.ts',
  registerServiceWorker: './browser/registerServiceWorker.js',
  serviceWorker: './browser/serviceWorker.js',
}

const tsLoaderRule = {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
  }
}

if (mode === 'production') {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  )
  tsLoaderRule.use.options.configFile = 'tsconfig.prod.json'
} else {
  entry.liveReload = './browser/liveReload.js'
}

const webpackConfig = {
  mode,
  devtool,
  entry,
  output: {
    filename,
    path: path.resolve(__dirname, 'browser', 'dist')
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      tsLoaderRule,
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
