const base = require("./base");
const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require("webpack-merge");
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const cleanWebpackPlugin = new CleanWebpackPlugin('dist/**');
// const uglifyJsPlugin = new new webpack.optimize.UglifyJsPlugin({
// 	ie8: true,
// 	keep_fnames: true,
// 	parallel: true,
// 	sourceMap: true
// });

module.exports = merge(base, {
	mode: 'production',
	
	devtool: 'source-map',
	
	// entry: {
	// 	production: path.resolve(__dirname, './views/production/app.jsx'),
	// },

	entry: './src/index.js',

	// output: {
	// 	path: path.resolve(__dirname, 'dist'),
	// 	filename: 'js/[name].js',
	// 	publicPath: '/',
	// 	chunkFilename: 'js/[name].js',
	// },

	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: 'main.js',
		// library: 'fb-core',
		// libraryTarget: 'cmd',
		// umdNamedDefine: true
	},


	plugins: [
		cleanWebpackPlugin
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'env',
								{
									targets: {
										browsers: ['last 2 versions', 'ie >= 7'],
									},
									modules: 'commonjs',
									useBuiltIns: true,
									debug: false,
								},
							],
							//'react',
							'stage-2',
						],
						plugins: ['transform-runtime'],
					},
				},
				//include: [path.resolve(__dirname, 'views')],
			},
		]
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					ie8: true,
				},
				sourceMap: true,
			}),
		],
	}
});