const base = require("./base");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
	inject: true,
	filename: path.join(__dirname, '../examples/dist/index.html'),
	template: path.join(__dirname, '../examples/index.html'),
	meta: {
		'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
	}
});

module.exports = merge(base, {

	entry: {
		main: ["./src/examples"]
	},

	output: {
		path: path.join(__dirname, '../examples/dist'),
		publicPath: '',
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},

	resolve: {
		alias: {
			//"fb-ui": '../../src/index',
		}
	},

	plugins: [
		htmlWebpackPlugin,
		new webpack.HotModuleReplacementPlugin()
	],

	// optimization: {
	// 	splitChunks: {
	// 		commons: {
	// 			test: /[\\/]node_modules[\\/]/,
	// 			name: 'vendors',
	// 			chunks: 'all'
	// 		}
	// 	}
	// },

	devServer: {
		contentBase: path.join(__dirname, '../dist'), // 根目录
		hot: true,   // 是否开启热替换，无须手动刷新浏览器
		host: "192.168.199.18",
		port: 8081,    // 端口
		open: true,     // 是否自动打开浏览器
		noInfo: false,   // 不提示打包信息，错误和警告仍然会显示
		disableHostCheck: true, //  新增该配置项
		//overlay: true,
	},
});