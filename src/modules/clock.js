var clock = {
	start: new Date().getTime()
}

clock.elapsed = function() {
	return new Date().getTime() - clock.start;
}