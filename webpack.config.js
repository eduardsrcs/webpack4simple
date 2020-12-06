let path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
  entry: './src/index.js', // entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    overlay: true
  },
  plugins: [new MiniCssExtractPlugin({
    attributes: {
      id: 'target',
      'data-target': 'example',
    },
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  // devtool: 'eval-sourcemap'
}

module.exports = (env, options) => {
  let production = options.mode === 'production'
  conf.devtool = production
                 ? 'source-map' // can insert false
                 : 'eval-sourcemap'
  return conf
}