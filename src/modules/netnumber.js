var netnumber = function(val, delta){
	if (val) {
		this.val = val;
	} else {
		this.val = 0;
	}
	if (delta) {
		this.delta = delta;
	} else {
		this.delta = 0;
	}
}