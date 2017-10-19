module.exports = function setup() {
	this.taskRunner = this.config.get('taskRunner') || [];
};