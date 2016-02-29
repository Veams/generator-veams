/**
 * Represents a helper to use markdown files and return HTML.
 *
 * @author Sebastian Fitzner
 */

var Marked = require('marked');
var fs = require('fs');

(function() {
	module.exports.register = function(Handlebars, options) {

		/*
		 * Custom Markdown helper.
		 *
		 * @return HTML
		 */
		Handlebars.registerHelper('markdown', function(path) {
			var content = fs.readFileSync(path, 'utf-8');

			return new Handlebars.SafeString(Marked(content));
		});
	};
}).call(this);
