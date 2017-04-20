console.log("TÄMÄ ON PDF");

var previous = "";
var current = "";
var translation = "";

var inLanguage = "en";
var outLanguage = "fi";

$( "body" ).mouseup(function() {
  triggerSelection();
});

console.log("KETÄ??");

function triggerSelection() {
  current = document.getSelection().toString();
  setTimeout(timeOut,300);

}


function timeOut() {
	previous = current;
	current = document.getSelection().toString();

	if (previous == current && current != "") {
  		//console.log("Selected: " + current);
  		translate(current);
	}
}

function translate(text) {
	console.log(inLanguage + "->" + outLanguage)
	jQuery(function($) {
		var settings = {
			srclang: inLanguage,                                // source language
			dstlang: outLanguage,                             // destination languages, comma separated list
			apikey: 'trnsl.1.1.20170417T175912Z.84b43f647d661e07.5622e9fc3b007773a2072aa1ca36f6b99c23ec61', // http://api.yandex.ru/key/form.xml?service=trnsl
		};

		jQuery("div").yaTranslate(settings, text);
	});
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
	var translationText = "<div class='smallerBox'><br><br><br>" + current + "<br><hr style='height:7px; visibility:hidden;' />" + text + "</div>";
	translationText = translationText + "<div class='yandex'>Powered by Yandex.Translate</div>";
	box.innerHTML = translationText;
}


function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  console.log("GOT");
  if (item.inLanguage) {
  	console.log("in:" + item.inLanguage);
    inLanguage = item.inLanguage;
  }
  if (item.outLanguage) {
  	console.log("out:" + item.outLanguage);
    outLanguage = item.outLanguage;
  }
}

var getting = browser.storage.local.get("inLanguage");
getting.then(onGot, onError);

getting = browser.storage.local.get("outLanguage");
getting.then(onGot, onError);

if (inLanguage == "")
	inLanguage = "en";
if (outLanguage == "")
	outLanguage = "fi";
