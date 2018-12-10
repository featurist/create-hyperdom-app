const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    app: './browser/index.js',
    registerServiceWorker: './browser/registerServiceWorker.js',
    serviceWorker: './browser/serviceWorker.js',
    liveReload: './browser/liveReload.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'browser', 'dist')
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // defaults to 'development' unless process.env.NODE_ENV is set
      DEBUG: false
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
}
