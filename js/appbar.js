/*
	Component: Side Navigation
	Author: XOR Projects
	GitHub: https://github.com/xorprojects/Material-Web-Framework
*/

var ele;
var waterfallEle;

var materialWeb = materialWeb || {};
materialWeb.appbar = {
	"initialize": function(options) {
		ele = options.element || document.getElementById("appbar");
		waterfall = options.waterfall || false;

		if (waterfall) {
			waterfallEle = options["waterfall element"] || document.getElementById("waterfall");
			document.addEventListener("scroll", materialWeb.appbar.checkScroll, false);
			materialWeb.appbar.checkScroll();
		}
	},
	"checkScroll": function() {
		if (window.matchMedia("(max-width: 600px) and (orientation: portrait), (max-width: 960px) and (orientation: landscape)").matches) {
			if (document.body.scrollTop < 48 && document.documentElement.scrollTop < 48) {
				ele.classList.remove("scrolling");
				waterfallEle.classList.remove("scrolling");
			} else {
				ele.classList.add("scrolling");
				waterfallEle.classList.add("scrolling");
			}
		} else {
			if (document.body.scrollTop === 0 && document.documentElement.scrollTop === 0) {
				ele.classList.remove("scrolling");
				waterfallEle.classList.remove("scrolling");
			} else {
				ele.classList.add("scrolling");
				waterfallEle.classList.add("scrolling");
			}
		}
	},
	"add": function(options) {
		var appbar = document.createElement("div");
		appbar.id = "appbar";
		var innerHTML = "";

		// App Name
		if (typeof options.appname !== "undefined" && options.appname.enable != false) {
			innerHTML += "<span id=\"appname\">" + options.appname + "</span>";
		}

		// Tabs
		if (typeof options.tabs !== "undefined" && options.tabs.enable != false) {
			innerHTML += "<span class=\"tabs\">";
			var tabs = options.tabs.items;
			for (var i = 0; i < tabs.length; i++) {
				if (typeof tabs[i].active !== "undefined" && tabs[i].active != false) {
					innerHTML += "<span class=\"tab active\">" + tabs[i].title + "</span>";
				} else {
					innerHTML += "<span class=\"tab\">" + tabs[i].title + "</span>";
				}
			}
			innerHTML += "</span>";
		}

		// Actions
		if (typeof options.actions !== "undefined" && options.actions.enable != false) {
			innerHTML += "<span class=\"actions\">";
			var actions = options.actions.items;
			for (var i = 0; i < actions.length; i++) {
				innerHTML += "<span class=\"tab\">" + actions[i].icon + "</span>";
			}
			innerHTML += "</span>";
		}

		appbar.innerHTML = innerHTML;
		document.body.appendChild(appbar);
	}
}