var input = {}

var canvas = document.getElementById('canvas');
canvas.onselectstart = function () { return false; }

input.downkeys = [];

input.buffer = [];

input.event = function(type, e){
	this.type = type;
	if (this.type==input.type.KEYBOARD || this.type==input.type.TEXTINPUT) {
		this.code = e.keyCode;
		this.letter = String.fromCharCode(e.keyCode);
	} else if (this.type==input.type.MOUSE) {
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
		var ev = new input.event(input.type.KEYBOARD, e)
		socket.emit('event',{type: 'down', code: e.keyCode});
		input.buffer.push(ev);
	}
});

jQuery(document).keyup(function(e){
	socket.emit('event',{type: 'up', code: e.keyCode});
	input.downkeys[e.keyCode]=false;
});

jQuery(document).mousedown(function(e){
	var ev = new input.event(input.type.MOUSE, e)
	socket.emit('event',{type: 'down', code: e.keyCode});
	input.buffer.push(ev);
});

jQuery(document).mouseup(function(e){
	socket.emit('event',{type: 'up', code: e.keyCode});
	//input.downkeys[e.keyCode]=false;
});

jQuery(document).keypress(function(e){
	socket.emit('event',{type: 'press', code: e.keyCode});
	input.buffer.push(new input.event(input.type.TEXTINPUT, e));
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