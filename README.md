Secret Nemesis
==============

A simple framework for HTML5/JS games and apps.
Uses Node.js on the server, and communicates with Socket.io


Design
======

- Phat server, skinny client

	> While the client should be busy making things look nice, we won't trust him, and in fact, running the game on the server makes sense.
  
- Focus on simplifying the client-server conversation
  > Provide a set of primitives useful for app creation, and let the framework deal with them

  > Write a single codeset that plays both in the client and on the server


Client
------

-	Loader
	> Provide the loader with a list of files, and they will be loaded before the app begins.

-	Gamestate Manager
	> Use a 'switch()' function to switch to a new gamestate.

-	Require
	> Simple mechanism to include other JS files as libaries

-	Loading screen
	> A bar should be displayed on the screen

-	Input manager
	> Input events should be accessible via a simple interface.
	> Like:
	
		input.assign( 'w', 'jump' );
		input.on( 'jump',
			function(){
				do.stuff();
			}
		);

-	Sound and image manager
	> Sounds and images should be pants to load and use. Use in combination with the Loader plox

-	Client-side prediction
	> Implementation of a posvec object which supports tweening and prediction


Server
------

-	Fat server
	> The server will run all the simulation and send periodic updates to all connected clients

-	Bitchy server
	> The server never replies instantly, it buffers up answers for one tick then sends them in a block. This is to avoid ping spam, and also so we can detect duplicate info
