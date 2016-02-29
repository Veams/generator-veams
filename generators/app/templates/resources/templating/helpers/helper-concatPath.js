/**
 * Represents a helper to concat paths.
 *
 * @author Sebastian Fitzner
 */
var config = require('../../../helpers/config');

(function() {
	module.exports.register = function(Handlebars, options) {

		/*
		 * Custom Path helper to concat paths.
		 *
		 * @return String
		 */
		Handlebars.registerHelper('concatPath', function(obj) {
			if(!obj.hash) return;
			var type = obj.hash.type ? obj.hash.type : 'src';
			var filePath = obj.hash.file;

			return config.options.paths[type] + '/' + filePath;
		});
	};
}).call(this);
