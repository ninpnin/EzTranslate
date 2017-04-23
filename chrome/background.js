var lastSelection = "";

console.log("LAST SELECTION: " + lastSelection);

chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	console.log("JKNFDJJD");
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});


function sendServiceRequest(selectedText) {                                         

	console.log("SELECTED:" + selectedText);
}