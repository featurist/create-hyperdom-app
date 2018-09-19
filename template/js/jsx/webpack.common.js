const path = require('path')

module.exports = {
  entry: './browser/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'browser', 'dist')
  },
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
