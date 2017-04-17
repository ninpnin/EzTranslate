console.log("TÄMÄ ON PDF");


var previous = "";
var current = "";

//document.body.style.border = "5px solid red";
$( "body" ).click(function() {
  triggerSelection();
});

console.log("KETÄ??");



function triggerSelection() {

  current = document.getSelection().toString();
  setTimeout(timeOut,500);
}

function timeOut() {
	previous = current;
	current = document.getSelection().toString();

	if (previous == current && current != "")
  		console.log("Selected: " + current);

}