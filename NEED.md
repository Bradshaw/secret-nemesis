The things I need to do
=======================

Network number
--------------

>	A number that varies over time, synchronised by the network

>	Can be Synced to a set of commands or simply slaved by the server

>	Has a current value and a delta


Entity graph
------------

>	Contains entities which have a standard format
		type: name of the type - specifies number and order of numbers
		update(): simply increments the numbers by delta
		draw(): called clientside
		dictate(): sets the numbers and deltas by the server
		push(): requests a setting of the deltas to the server

