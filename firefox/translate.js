console.log("TÄMÄ ON PDF");

var previous = "";
var current = "";
var translation = "";

$( "body" ).click(function() {
  triggerSelection();
});

console.log("KETÄ??");

function triggerSelection() {

  current = document.getSelection().toString();
  setTimeout(timeOut,300);
}
//      "matches": ["*://*/*.pdf"],


function timeOut() {
	previous = current;
	current = document.getSelection().toString();

	if (previous == current && current != "") {
  		//console.log("Selected: " + current);
  		translate(current);
	}
}

function translate(text) {

	jQuery(function($) {
		var settings = {
			srclang: 'en',                                // source language
			dstlang: 'fi',                             // destination languages, comma separated list
			apikey: 'trnsl.1.1.20170417T175912Z.84b43f647d661e07.5622e9fc3b007773a2072aa1ca36f6b99c23ec61', // http://api.yandex.ru/key/form.xml?service=trnsl
		};

		jQuery("div").yaTranslate(settings, text);
	});
	return lastTranslation;
}

window.onload = initBox();

function initBox() {
	var iDiv = document.createElement('div');
	iDiv.id = 'wordBox';
	iDiv.className = 'wordBox';
	document.getElementsByTagName('body')[0].appendChild(iDiv);
}

function updateBox(text) {
	console.log("UPDATE BOX: " + text);
	var box = document.getElementById("wordBox");
	box.innerHTML = "<div class='smallerBox'><br><br>" + current + "<br><hr style='height:7px; visibility:hidden;' />" + text + "</div>";
}


