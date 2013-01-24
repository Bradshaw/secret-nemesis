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

netnumber.prototype.update = function() {
	this.val += this.delta;
};

netnumber.prototype.setDelta = function(delta) {
	this.delta = delta;
};

netnumber.prototype.setValue = function(val) {
	this.val = val;
};