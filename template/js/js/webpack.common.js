const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: './browser/app.js',
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
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
