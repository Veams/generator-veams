exports.questions = function () {
	return {};
};

exports.setup = function () {};

exports.scaffold = function () {
	this.template('server/main.js.ejs', 'server/main.js');
};