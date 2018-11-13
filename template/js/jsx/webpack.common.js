const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    app: './browser/app.jsx',
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-transform-react-jsx', {pragma: 'hyperdom.jsx'}],
              'babel-plugin-transform-jsx-hyperdom-binding'
            ]
          }
        }
      },
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
