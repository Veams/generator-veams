(function () {
	module.exports.register = function (Handlebars, options) {
		/**
		 * Random number helper.
		 *
		 * @return random number
		 */
		Handlebars.registerHelper('random', function () {
			var randomnumber = Math.floor(Math.random() * 1001);
			return randomnumber;
		});
	};
}).call(this);
