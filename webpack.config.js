var path = require('path');
var webpack = require('webpack');
var config = {
	entry: './index.js',
	output: {
		path: path.join(__dirname, '/docs'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx$|\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
};

module.exports = config;
