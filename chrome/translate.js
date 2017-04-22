console.log("TÄMÄ ON PDF");

var previous = "";
var current = "";
var translation = "";

$( "body" ).mouseup(function() {
  triggerSelection();
});

$(document).keypress("h", function(e) {
  	toggleDrawerHide();
});


function triggerSelection() {
  current = document.getSelection();
  setTimeout(timeOut, 300);

}
//      "matches": ["*://*/*.pdf"],


function timeOut() {
	previous = current;
	current = window.getSelection().toString();

	if (previous == current && current != "") {
  		console.log("Selected: " + current);
  		translate(current);
	} else {
		translate("what a disgusting browser");
	}
}

function translate(text) {
	
	console.log("translate called");
	jQuery(function($) {
		var settings = {
			srclang: 'en',                                // source language
			dstlang: 'fi',                             // destination languages, comma separated list
			apikey: 'trnsl.1.1.20170417T175912Z.84b43f647d661e07.5622e9fc3b007773a2072aa1ca36f6b99c23ec61', // http://api.yandex.ru/key/form.xml?service=trnsl
		};

		jQuery("div").yaTranslate(settings, text);
	});
}

document.onload = initBox();

function initBox() {

	console.log($);

	var iDiv = document.createElement('div');
	iDiv.id = 'wordBox';
	iDiv.className = 'wordBox';
	document.getElementsByTagName('body')[0].appendChild(iDiv);
	console.log(document.getElementById("wordBox"));

}

function updateBox(text) {
	console.log("UPDATE BOX: " + text);
	var box = document.getElementById("wordBox");
	box.innerHTML = "<div class='smallerBox'><br><br>" + current + "<br><hr style='height:7px; visibility:hidden;' />" + text + "</div>";
	$("#wordBox").toggle(true);

}



function toggleDrawerHide() {
	console.log("TOGGLE DRAWER HIDING");
	//var box = document.getElementById("wordBox");
	$("#wordBox").toggle();

}








chrome.runtime.onMessage.addListener( 
    function(request, sender, sendResponse) { 
        if (request.method == "getSelection") 
            sendResponse({data: window.getSelection().toString()});
        else
            sendResponse({});
    }
)
