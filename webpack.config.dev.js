const path = require('path');
const webpack = require('webpack');

const config = {
  mode: 'development',
  entry: './demo/demo.jsx',
  output: {
    path: path.join(__dirname, '/demo/'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '/demo/'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2'],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

module.exports = config;
