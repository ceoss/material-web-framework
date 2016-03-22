var onHeadDefined = (function() {
	"use strict";
	var headLoadedResolve;

	function checkHeadLoaded() {
		if (document.getElementsByTagName("head")[0]) {
			headLoadedResolve();
		} else {
			setTimeout(checkHeadLoaded, 10);
		}
	}
	return new Promise(function(resolve) {
		headLoadedResolve = resolve;
		checkHeadLoaded();
	});
})();
onHeadDefined.then(function() {
	var link = document.createElement("link");
	link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
});