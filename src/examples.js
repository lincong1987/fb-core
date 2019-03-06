/*
 This file 'examples' is part of Firebird Integrated Solution 1.0

 Copyright (c) 2019 Lincong

 Contact:  
        Email: lincong1987@gmail.com

        QQ: 159257119
 
 See Usage at http://www.jplatformx.com/firebird

 Create date: 2019-01-16 21:55
 */

import {FireBird} from "./index"

new FireBird({
	el: "#app",
	template: `
<div>
	Hello World, <span style="color:{{color}}">{{now}}</span>
</div>
	`,
	data() {
		return {
			now: new Date()
		}
	},
	afterMount() {

		setInterval(() => {
			this.set("now", new Date());
			this.set("color", "red");
		}, 500);

		// document.title = "mounted"
	}
});