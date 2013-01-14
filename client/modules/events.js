var eventor = {}

eventor.downkeys = [];

eventor.type = {
	KEYBOARD: 0,
	TEXTINPUT: 1,
	MOUSE: 2,
	SYSTEM: 3,
	NET: 4
}

eventor.e = function(e){

}

jQuery(document).keydown(function(e){
	eventor.downkeys[e.keyCode]=true;
});

jQuery(document).keyup(function(e){
	eventor.downkeys[e.keyCode]=false;
});

jQuery(document).keypress(function(e){
  var n = String.fromCharCode(e.keyCode);
});

eventor.isDown = function(key){
	return eventor.downkeys[key];
}