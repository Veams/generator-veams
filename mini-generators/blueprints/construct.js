module.exports = function construct() {
	this.argument('name', {
		type: String,
		required: true
	});

	this.argument('path', {
		type: String,
		required: true
	});

	// This method adds support for flags
	this.option('config');
	this.option('component');
};