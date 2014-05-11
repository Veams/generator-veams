(function () {
	module.exports.register = function (Handlebars, options) {

		/*
		 * Loop helper.
		 *
		 * @return easy for-loop
		 */
		Handlebars.registerHelper('times', function (n, block) {
			var content = '';
			for (var i = 0; i < n; ++i)
				content += block.fn(i);
			return content;
		});

		/*
		 * Loop helper.
		 *
		 * @return advanced for-loop
		 */
		Handlebars.registerHelper('for', function (from, to, incr, block) {
			var content = '';
			for (var i = from; i < to; i += incr)
				content += block.fn(i);
			return content;
		});

	};
}).call(this);
