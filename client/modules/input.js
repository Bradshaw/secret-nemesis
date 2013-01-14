var input = {}

input.downkeys = [];

input.type = {
	KEYBOARD: 0,
	TEXTINPUT: 1,
	MOUSE: 2,
	SYSTEM: 3,
	NET: 4
}

input.e = function(e){

}

jQuery(document).keydown(function(e){
	input.downkeys[e.keyCode]=true;
});

jQuery(document).keyup(function(e){
	input.downkeys[e.keyCode]=false;
});

jQuery(document).keypress(function(e){
  var n = String.fromCharCode(e.keyCode);
});

input.isDown = function(key){
	return input.downkeys[key];
}