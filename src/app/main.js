var main = new gs.gamestate('main');

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
		shoot: 0
	}
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
		if (e.btn==32){
			unit.shoot += 5;
		}
	}

	unit.dx*=0.85
	unit.dy*=0.85

	unit.x+=unit.dx
	unit.y+=unit.dy

	unit.shoot*=0.9;


	// Draw
	ctx.fillStyle = '#131313';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = '#888888';
	ctx.fillRect(unit.x-2.5,unit.y-2.5,5,5);
	ctx.strokeStyle = '#888888';
	ctx.setLineWidth(unit.shoot*unit.shoot);
	ctx.beginPath();
	ctx.moveTo(unit.x, unit.y);
	ctx.lineTo((input.getX()-unit.x)*1000,(input.getY()-unit.y)*1000);
	ctx.stroke();

	dispLog();
};

/**	Called when events happen
*
*	event - object containing the event that occurred
*/
main.eventreg = function(event) {

};