(function () {
	module.exports.register = function (Handlebars, options) {

		/*
		 * Syntax helper.
		 *
		 * @return encoded html entities
		 */
		Handlebars.registerHelper('syntax', function (context) {
			var content = context.fn(this).replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
			return content;
		});

	};
}).call(this);
