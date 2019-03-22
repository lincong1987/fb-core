/*
 This file 'index' is part of Firebird Integrated Solution 1.0

 Copyright (c) 2019 Lincong

 Contact:  
        Email: lincong1987@gmail.com

        QQ: 159257119
 
 See Usage at http://www.jplatformx.com/firebird

 Create date: 2019-03-06 16:20
 */

//require("es5-polyfill")

let Yox = require("yox");
let jQuery = require("jquery");
let _ = require("lodash");
let Store = require("./lib/store").Store;
let Router = require("./lib/router").Router;
let dayjs = require("./lib/dayjs").dayjs;
let pkg = require("../package.json");


Yox.prototype.getSlot = function (name) {
	return this.get(`$slot_${name}`);
};

Yox.prototype.hasSlot = function (name) {
	return typeof this.getSlot(name) !== "undefined";
};


let FireBird = (function () {
	function FireBird(options) {
		return new Yox(options);
	}

	return FireBird;
})();

_.each(Yox, (func, name) => {
	FireBird[name] = func;
});

FireBird.log = (msg) => {
	console.log(`[FireBird info]: ${msg}`);
};
FireBird.warn = (msg) => {
	console.warn(`[FireBird warn]: ${msg}`);
};
FireBird.error = (msg) => {
	console.error(`[FireBird error]: ${msg}`);
};


FireBird.components = {};

FireBird.classes = {};

FireBird.namespace = function () {
	var a = arguments, o, i = 0, j, d, arg;
	for (; i < a.length; i++) {
		o = this; //Reset base object per argument or it will get reused from the last
		arg = a[i];
		if (arg.indexOf(".") > -1) { //Skip this if no "." is present
			d = arg.split(".");
			for (j = (d[0] == 'FireBird') ? 1 : 0; j < d.length; j++) {
				o[d[j]] = o[d[j]] || {};
				o = o[d[j]];
			}
		} else {
			o[arg] = o[arg] || {};
			o = o[arg]; //Reset base object to the new object so it's returned
		}
	}
	return o;
};

FireBird.create = (name, options) => {
	return new FireBird($.extend(true, {}, FireBird.components[name], options));
};

FireBird.component = (name, options) => {
	if (typeof name === "string") {
		if (typeof options === "function") {

		} else {
			options.name = name;
			if (options.extend) {

				if (typeof options.extend === "string") {
					options.extend = FireBird.components[options.extend] || null;
				}

				options = $.extend(true, {}, options.extend, options, {
					"_parent": options.extend.name
				});
			}
		}

		Yox.component(name, options);
		FireBird.log(`组件 ${name} 已注册`);
		FireBird.components[name] = options;
		//FireBird.defaults[name] = options;
		FireBird.namespace(name);
		return options;
	}
	if (typeof name === "object") {
		_.each(name, (options, comp) => {
			FireBird.component(comp, options);
		});
	}
};

FireBird.partials = {};

FireBird.partial = (name, template) => {
	if (typeof name === "string") {
		Yox.partial(name, template);
		FireBird.log(`模版 ${name} 已注册`);
		FireBird.partials[name] = template;
		return template;
	}
	if (typeof name === "object") {
		_.each(name, (template, partial) => {
			FireBird.partial(partial, template);
		});
	}
};

/**
 * 组件 class 处理器
 * @param cssObject
 * @returns {string}
 */
FireBird.css = (cssObject = []) => {
	let classes = [];
	_.each(cssObject, (css) => {
		if (_.isObject(css)) {
			_.each(css, (v, k) => {
				if (typeof v !== "undefined" && v === true) {
					classes.push(k);
				}
			});
		}
		if (_.isString(css)) {
			classes.push(css);
		}
	});
	return classes.join(" ");
};

FireBird.style = (styleObject = {}) => {
	let style = [];

	_.each(styleObject, (v, k) => {
		style.push(`${k}: ${v}`);
	});

	return style.join("; ");
};

FireBird.oneOf = (value, defaults, array = []) => {
	if (!FireBird.array.has(array, value)) {
		return defaults;
	}
	return value;
};


// 将 lodash 注入
FireBird.filter(_);

Store.install(FireBird);
Router.install(FireBird);

FireBird.component("PageApp", {
	template: "<div></div>",
	data() {
		return {};
	}
});


global.FireBird = FireBird;

let version = pkg.version;
console.log(" _______________________________________________________________________");
console.log("|                                                                       |");
console.log("|  ######## #### ########  ######## ########  #### ########  ########   |");
console.log("|  ##        ##  ##     ## ##       ##     ##  ##  ##     ## ##     ##  |");
console.log("|  ##        ##  ##     ## ##       ##     ##  ##  ##     ## ##     ##  |");
console.log("|  ######    ##  ########  ######   ########   ##  ########  ##     ##  |");
console.log("|  ##        ##  ##   ##   ##       ##     ##  ##  ##   ##   ##     ##  |");
console.log("|  ##        ##  ##    ##  ##       ##     ##  ##  ##    ##  ##     ##  |");
console.log("|  ##       #### ##     ## ######## ########  #### ##     ## ########   |");
console.log("|                                                                       |");
console.log(`|${_.pad("", 71)}|`);
console.log(`|${_.pad("Version: " + version, 71)}|`);
console.log(`|${_.pad("Date: " + dayjs().format(), 71)}|`);
console.log(`|${_.pad("Author: lincong1987@gmail.com", 71)}|`);
//console.log("|                                                                       |");
console.log("|_______________________________________________________________________|");


// return {
// 	FireBird: FireBird,
// 	jQuery: jQuery,
// 	$: $,
// 	Router: Router,
// 	Store: Store,
// 	dayjs: dayjs,
// 	version: version,
// 	_: _,
// 	lodash: _
// };

// exports.FireBird = FireBird;
// exports.Store = Store;
// exports.Router = Router;
// exports.jQuery = jQuery;
// exports.$ = jQuery;
// exports._ = _;
// exports.dayjs = dayjs;
// exports.version = version;

// export default {
// 	FireBird, Store, Router, jQuery, $, _, dayjs, version
// }

let $ = jQuery, lodash = _;

module.exports = {FireBird, Store, Router, jQuery, $, _, lodash, dayjs, version}
