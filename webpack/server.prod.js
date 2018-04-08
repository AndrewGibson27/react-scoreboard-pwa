const fs = require('fs');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line

const {
  SERVER_ENTRY,
  SERVER_OUTPUT,
} = require('./base');

function getExternals() {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`; // eslint-disable-line no-param-reassign
    return ext;
  }, {});
}

module.exports = {
  context: process.cwd(),

  mode: 'production',

  target: 'node',

  entry: SERVER_ENTRY,

  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js',
  },

  externals: getExternals(),

  node: {
    __filename: true,
    __dirname: true,
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
