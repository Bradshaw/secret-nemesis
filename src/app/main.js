var main = new gs.gamestate('main');

function zap(x1,y1,x2,y2){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.time = 3;
}

// This is where the user writes his app.
// Redefine the functions below for beautiful awesomness...

/**	Initialises the state
*
*	Called once, when the state is first used. Initialise all the objects the 
*	state will need in here
*/
main.init = function() {
	unit = {
		x: 400,
		y: 200,
		dx: 0,
		dy: 0,
		shoot: 0.1
	}
	zaps = [];
	socket.on('zap',function(data){
		//console.log('Zapped')
		zaps.push(data);
	})
};

/**	Prepares the state for entry
*
*	Called each time the state is entered.
*	Useful to prepare the environment.
*/
main.enter = function(previous) {
};

/**	Prepare the state for departure
*
*	Called each time we switch away from the state.
*	Allows the state to clean up after itself.
*	Be a friendly state and leave things how they were when you found them!
*/
main.leave = function() {
};

/** Called each frame
*
*	The contents of your main loop goes here.
*/
main.update = function() {
	// Simulate
	if (input.isDown(40)) {unit.dy += 1};
	if (input.isDown(38)) {unit.dy -= 1};
	if (input.isDown(39)) {unit.dx += 1};
	if (input.isDown(37)) {unit.dx -= 1};
	while (input.buffer.length>0) {
		var e = input.buffer.pop();
		if (e.type == input.type.MOUSE){
			socket.emit('zap', new zap(unit.x, unit.y, (input.getX()-unit.x)*1000, (input.getY()-unit.y)*1000) )
			//zaps.push(new zap(unit.x, unit.y, (input.getX()-unit.x)*1000, (input.getY()-unit.y)*1000) ) ;
			//console.log(zaps.length)
			//for (var i = 0; i < zaps.length; i++) {
				//console.log(zaps[i].x1);
			//};
		}
	}

	//unit.dx*=0.85
	//unit.dy*=0.85

	unit.dx-=(unit.dx)/5
	unit.dy-=(unit.dy)/5

	unit.x+=unit.dx
	unit.y+=unit.dy

	for (var i = 0; i < zaps.length; i++) {
		zaps[i].time*=0.9
	};

	var i = 0;
	while (i<zaps.length) {
		if (zaps[i].time<=0.001){
			zaps.splice(i,1);
		} else {
			i++;
		}
	}


	// Draw
	ctx.fillStyle = '#131313';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = '#888888';
	ctx.fillRect(unit.x-5,unit.y-5,10,10);
	ctx.strokeStyle = '#888888';
	for (var i = 0; i < zaps.length; i++) {
		ctx.setLineWidth( zaps[i].time * zaps[i].time );
		ctx.beginPath();
		ctx.moveTo(zaps[i].x1, zaps[i].y1);
		ctx.lineTo(zaps[i].x2, zaps[i].y2);
		ctx.stroke();
		ctx.closePath();
	};

	/**
	if (music) {
		ctx.beginPath();
		ctx.fillStyle = '#888899';
		ctx.strokeStyle = '#998888';
		ctx.setLineWidth(1);
		ctx.fillText(music.user.username+' - '+music.title,10,390);
		ctx.strokeText(music.user.username+' - '+music.title,10,390);
		ctx.stroke();
		ctx.closePath();
	}
	/**/

	dispLog();
};

/**	Called when events happen
*
*	event - object containing the event that occurred
*/
main.eventreg = function(event) {

};