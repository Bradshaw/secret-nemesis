var input = {}

input.downkeys = [];

input.buffer = [];

input.event = function(type, e){
	this.type = type;
	if (this.type==input.type.KEYBOARD || this.type==input.type.TEXTINPUT) {
		this.code = e.keyCode;
		this.letter = String.fromCharCode(e.keyCode);
	} else if (this.type==input.MOUSE) {
		this.x = e.pageX-$('#canvas').offset().left;
		this.y = e.pageY-$('#canvas').offset().top;
		this.btn = e.which;
	}
}

input.type = {
	KEYBOARD: 0,
	TEXTINPUT: 1,
	MOUSE: 2
}

input.filter = function(){
	this.nameToCode = [];
	this.codeToName = [];
}

input.filter.prototype.assign = function(name, code){
	if (!this.nameToCode[name]) {
		this.nameToCode[name] = [];
	}
	if (!this.codeToName[code]) {
		this.codeToName[code] = [];
	}
	this.nameToCode[name].push(code);
	this.codeToName[code].push(name);
}

input.e = function(e){

}

jQuery(document).keydown(function(e){
	if (!input.downkeys[e.keyCode]) {
		input.downkeys[e.keyCode]=true;
		input.buffer.push(new input.event(input.KEYBOARD, e));
	}
});

jQuery(document).keyup(function(e){
	input.downkeys[e.keyCode]=false;
});

jQuery(document).keypress(function(e){
	input.buffer.push(new input.event(input.TEXTINPUT, e));
 	var n = String.fromCharCode(e.keyCode);
});

jQuery(document).mousemove(function(e){
	input.mouse.x = e.pageX-$('#canvas').offset().left;
	input.mouse.y = e.pageY-$('#canvas').offset().top;
})

input.mouse = {
	x: 0,
	y: 0
}

input.isDown = function(key){
	return input.downkeys[key];
}

input.getX = function(){
	return input.mouse.x;
}

input.getY = function(){
    return input.mouse.y;
}