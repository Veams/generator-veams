exports.questions = function () {
	return {};
};

exports.setup = function () {};

exports.scaffold = function () {
	this.fs.copyTpl(
		this.templatePath('server/main.js.ejs'),
		'server/main.js',
		this
	);
};