const path = require('path');
const webpack = require('webpack');
const config = {
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.join(__dirname, '/docs'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		port: 8080,
		contentBase: path.join(__dirname, '/docs'),
	},
	module: {
		rules: [
			{
				test: /\.jsx$|\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'env', 'stage-2']
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
};

module.exports = config;

