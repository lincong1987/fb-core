const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ROOT_PATH = path.resolve(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');

let resolve = (dir) => {
	return path.join(__dirname, './', dir)
};


console.log(process.env.NODE_ENV)

module.exports = {
	devtool: 'source-map',

	entry: './src/index.js',

	mode: process.env.NODE_ENV === "production" ? "production" : 'development',

	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: 'fb-core.min.js',
		library: 'fb-core',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},

	plugins: [],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},

		]
	}
};