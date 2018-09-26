const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './browser/app.js',
  output: {
    filename: 'bundle.js',
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
