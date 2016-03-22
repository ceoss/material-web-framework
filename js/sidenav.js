/*
	Component: Side Navigation
	Author: XOR Projects
	GitHub: https://github.com/xorprojects/Material-Web-Framework
*/

var materialWeb = materialWeb || {};
materialWeb.sideNav = {
	"toggle": function(ele) {
		ele = ele || document.getElementById("sidenav");
		function turnOffNavDimmer() {
			function removeNavDimmer() {
				sideNavDimmer.removeEventListener("transitionend", removeNavDimmer, false);
				sideNavDimmer.remove();
			}

			sideNavDimmer.removeEventListener("click", turnOffNavDimmer, false);
			sideNavDimmer.classList.remove("on");
			sideNavDimmer.addEventListener("transitionend", removeNavDimmer, false);
			ele.classList.remove("open");
		}

		ele.classList.add("open");
		var sideNavDimmer = document.createElement("div");
		sideNavDimmer.id = "sidenav-dimmer";
		document.body.appendChild(sideNavDimmer);
		setTimeout(function() {sideNavDimmer.classList.add("on");}, 0);
		sideNavDimmer.addEventListener("click", turnOffNavDimmer, false);
	},
	"add": function(options) {
		var sideNav = document.createElement("div");
		sideNav.id = "sidenav";
		var innerHTML = "";

		// Header
		if (typeof options.header !== "undefined" && options.header.enable != false) {
			innerHTML += "<div id=\"sidenav-header\">";
			if (typeof options.account !== "undefined" && options.account.enable != false) {
				innerHTML += "<img src=\"" + options.account.img + "\" id=\"sidenav-accountImg\"></img>";
			}
			// Profile Text
			if (typeof options.header.text !== "undefined" && options.header.text.enable != false) {
				innerHTML += "<div id=\"sidenav-titles\">";
				if (options.header.text.title) {
					innerHTML += "<span id=\"sidenav-title\">" + options.header.text.title + "</span>";
				}
				if (options.header.text.subtitle) {
					innerHTML += "<span id=\"sidenav-subtitle\">" + options.header.text.subtitle + "</span>";
				}
				innerHTML += "</div>";
			}
			if (typeof options.account !== "undefined" && options.account.enable != false) {
				innerHTML += "<i id=\"sidenav-accountIcon\" class=\"material-icons\">&#xE5C5;</i>";
			}
			innerHTML += "</div>";
		}

		// Navigation
		function navItemAdd(navItems) {
			for (var i = 0; i <= navItems.length - 1; i++) {
				if (navItems[i] === "divider") {
					innerHTML += "<div class=\"sidenav-divider\"></div>";
					continue;
				}
				if (typeof navItems[i].href !== "undefined" && navItems[i].href != false && window.location.pathname === navItems[i].href || window.location.hostname + window.location.pathname === navItems[i].href) {
					innerHTML += "<div class=\"sidenav-item sidenav-active\">";
				} else if (navItems[i].subOnly) {
					innerHTML += "<div class=\"sidenav-item sidenav-subOnly\">";
				} else {
					innerHTML += "<div class=\"sidenav-item\">";
				}
				typeof navItems[i].href !== "undefined" && navItems[i].href != false ? innerHTML += "<a href=\"" + navItems[i].href + "\">" : innerHTML += "<span>";
				if (typeof navItems[i].icon !== "undefined" && navItems[i].icon != false) {innerHTML += "<i class=\"material-icons\">" + navItems[i].icon + "</i>"};
				innerHTML += "<span>" + navItems[i].title + "</span>";
				navItems[i].href ? innerHTML += "</a>" : innerHTML += "</span>";

				// Sub Navigation
				if (typeof navItems[i].sub !== "undefined") {
					innerHTML += "<i class=\"material-icons\">&#xE5CF;</i><div class=\"sidenav-subItems\">";
					navItemAdd(navItems[i].sub);
					innerHTML += "</div>";
				}
				innerHTML += "</div>";
			}
		}
		if (options.navigation.enable) {
			navItemAdd(options.navigation.items);
		}

		sideNav.innerHTML = innerHTML;
		document.body.appendChild(sideNav);

		// Side Nav Sub Items
		var subTriggers = document.querySelectorAll(".sidenav-item > i.material-icons");
		for (var i = subTriggers.length - 1; i >= 0; i--) {
			subTriggers[i].addEventListener("click", function(event) {
				if (event.target.classList.contains("sidenav-active")) {
					event.target.classList.remove("sidenav-active");
					event.target.nextSibling.classList.remove("sidenav-active");
				} else {
					event.target.classList.add("sidenav-active");
					event.target.nextSibling.classList.add("sidenav-active");
				}
			}, false);
		}

		var subOnlyTriggers = document.querySelectorAll(".sidenav-item.sidenav-subOnly");
		for (var i = subOnlyTriggers.length - 1; i >= 0; i--) {
			subOnlyTriggers[i].addEventListener("click", function(event) {
				if (event.currentTarget.children[1].classList.contains("sidenav-active")) {
					event.currentTarget.children[1].classList.remove("sidenav-active");
					event.currentTarget.children[2].classList.remove("sidenav-active");
				} else {
					event.currentTarget.children[1].classList.add("sidenav-active");
					event.currentTarget.children[2].classList.add("sidenav-active");
				}
			}, false);
		}
	}
}