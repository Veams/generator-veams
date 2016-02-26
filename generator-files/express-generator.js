exports.questions = function () {
	return {};
};

exports.setup = function () {};

exports.scaffold = function () {
	this.copy('server/main.js', 'server/main.js');
};