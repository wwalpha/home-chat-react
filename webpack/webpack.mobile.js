const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../www'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, '../src/'),
      ui: path.resolve(__dirname, 'src/components/common/'),
      components: path.resolve(__dirname, 'src/components/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      constant: path.resolve(__dirname, 'src/constant/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['source-map-loader', 'eslint-loader'],
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new HappyPack({
      loaders: ['babel-loader', 'eslint-loader'],
    }),
    new webpack.EnvironmentPlugin('MOBILE'),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'GoogleHome Chat',
      filename: 'index.html',
      template: path.join(__dirname, '../index.template.ejs'),
      minify: false,
      hash: true,
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
    }),
  ],
  bail: true,
};