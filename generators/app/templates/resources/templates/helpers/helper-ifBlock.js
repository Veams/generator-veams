(function () {
	module.exports.register = function (Handlebars, options) {

		/*
		 * ifBlock helper.
		 *
		 * Determine if {{#block}} is set
		 *
		 * Example:
		 * {{#ifBlock "region-a"}} <div class="region region-a">{{#block "region-a"}}{{/block}}</div> {{/ifBlock}}
		 *
		 * @return true || false
		 */

		Handlebars.registerHelper('ifBlock', function (name, options) {
			var block = null;
			this.blocks = this.blocks || {};
			block = this.blocks[name];
			if (block) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

	};
}).call(this);
