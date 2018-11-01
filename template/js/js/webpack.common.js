const webpack = require('webpack')
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
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
