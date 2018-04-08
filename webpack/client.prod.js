const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest'); // eslint-disable-line

const {
  CLIENT_ENTRY,
  CLIENT_OUTPUT,
  SERVER_OUTPUT,
  PUBLIC_PATH,
} = require('./base');

module.exports = {
  context: process.cwd(),

  mode: 'production',

  entry: {
    main: CLIENT_ENTRY,
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT,
  },

  plugins: [
    new ReactLoadablePlugin({
      filename: path.join(SERVER_OUTPUT, 'react-loadable.json'),
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
      output: path.join(SERVER_OUTPUT, 'manifest.json'),
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
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
