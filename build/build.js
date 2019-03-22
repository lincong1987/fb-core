/*
 This file 'rollup.config.js' is part of Firebird Integrated Solution 1.0

 Copyright (c) 2019 Lincong

 Contact:  
        Email: lincong1987@gmail.com

        QQ: 159257119
 
 See Usage at http://www.jplatformx.com/firebird

 Create date: 2019-03-06 11:31
 */


const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const json = require("rollup-plugin-json");
const commonjs = require("rollup-plugin-commonjs");
const dayjs = require("dayjs");
const make = require("./make");

let output = {
	banner: `/* fb-core.js | ${dayjs().format()} | lincong1987@gmail.com */
	
	/*@add(fb-polyfill)*/
	
	`,
	format: 'umd',
	inlineDynamicImports: true,
	legacy: true,
	name: 'FireBird',
	exports: 'named',
	//globals: ['lodash', "jquery", "dayjs"]
};

(async function () {
	console.log("开始打包")
	const bundle = await rollup.rollup({
		input: 'src/index.js',
		//external: ['lodash', "jquery", "dayjs"],
		plugins: [
			resolve({
				jsnext: true,
				main: true,
				browser: true
			}),
			commonjs({
				sourcemap: true,
				ignoreGlobal: false,  // Default: false
			}),
			json(),
			babel({
				exclude: 'node_modules/**',
				babelrc: true,
				comments: true,
				runtimeHelpers: true
			})
		]
	}).catch(e => {
		console.log("打包出错")
		console.log(e)
	});


	console.log("编译代码")
	// const {code, map} = await bundle.generate(output);

	bundle.generate(output).then((options) => {

		//let code = options.output[0].code;
		


		console.log("尝试写入代码")
		make.buildBySource(options.output[0].code, 'fb-core.js', 'fb-core.min.js');
		console.log("任务完成")
	}).catch(e => {
		debugger
		console.log(e)
	})


})();
