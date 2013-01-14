var gs = {};
gs.current = null;
gs.next = null;
gs.switchargs = [];
gs.states = {};


/**	Switch to new gamestate on next update
*
*	Accepts an arbitrary number of arguments and passes them as an array to the
*	next state.
*/
gs.switchstate = function(nextstate) { // Nextstate needs to be a gamestate
	// Set the next state
	gs.next = nextstate;
	// Create an array to store extra arguments
	gs.switchargs = [];
	// Copy extra arguments to array
	for (var i = 1; i < arguments.length; i++) {
		gs.switchargs[i-1] = arguments[i];
	};
}

/**	Updates the gamestate manager
*
*	If a next state is defined, switch to that state. Then update the current
*	state
*/
gs.update = function() {

	// If there's a state to switch to
	if (gs.next) {
		// If there's a current state
		if (gs.current) {
			// Run the leave() method so it can clean up
			gs.current.leave();
		}

		// If the next state hasn't been initialised yet
		if (!gs.next.initialised) {
			// Initialise it
			gs.next.initialised = true;
			gs.next.init();
		}

		// Switch to the state
		gs.current = gs.next;
		gs.next = null;

		// Run the enter method so it can prepare itself
		gs.current.enter(gs.switchargs);
		gs.switchargs = [];
	}

	// Make sure we have a state to update
	if (gs.current){
		// Update it
		gs.current.update();
	} else {
		// Otherwise display a friendly reminder
		console.log('No current gamestate defined!');
		console.log('Forgot to gs.switchstate(state) maybe?');
	}
}

/**	Creates a new state
*
*	Reminder: Call this one like:
*		var myState = new gs.gamestate('myState');
*		              ^^^
*	otherwise you'll feel silly...
*/
gs.gamestate = function(name) {
	// Set the attributes
	this.name = name;
	this.initialised = false;
	gs.states[name] = this;
}

/* Default methods */
// These guys don't really do anything.
// They should be redefined for each state by the framework user

/**	Initialises the state
*
*	Called once, when the state is first used. Initialise all the objects the 
*	state will need in here
*/
gs.gamestate.prototype.init = function() {};

/**	Prepares the state for entry
*
*	Called each time the state is entered.
*	Useful to prepare the environment.
*/
gs.gamestate.prototype.enter = function(previous) {};

/**	Prepare the state for departure
*
*	Called each time we switch away from the state.
*	Allows the state to clean up after itself.
*	Be a friendly state and leave things how they were when you found them!
*/
gs.gamestate.prototype.leave = function() {};

/** Called each frame
*
*	The contents of your main loop goes here.
*/
gs.gamestate.prototype.update = function() {};

/**	Called when events happen
*
*	event - object containing the event that occurred
*/
gs.gamestate.prototype.eventreg = function(event) {};