const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest'); // eslint-disable-line

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
  SERVER_OUTPUT,
} = require('./base');

module.exports = {
  context: process.cwd(),

  mode: 'development',

  entry: {
    main: [
      'webpack-hot-middleware/client',
      CLIENT_ENTRY,
    ],
  },

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactLoadablePlugin({
      filename: path.join(SERVER_OUTPUT, 'react-loadable.json'),
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
      output: path.join(SERVER_OUTPUT, 'manifest.json'),
      writeToDisk: true,
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },

    runtimeChunk: 'single',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          forceEnv: 'client',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
