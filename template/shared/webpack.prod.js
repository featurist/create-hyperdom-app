const merge = require('webpack-merge')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js'
  },
  plugins: [
    new MinifyPlugin()
  ]
})
