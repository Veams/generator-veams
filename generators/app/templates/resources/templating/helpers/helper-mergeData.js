/**
 * Represents a helper to merge two data objects.
 *
 * @author Sebastian Fitzner
 */

module.exports.register = function (Handlebars, options) {
	/*
	 * merge data helper.
	 *
	 * @return object
	 */
	Handlebars.registerHelper('mergeData', function (file, obj) {
		var obj1 = file;
		var obj2 = JSON.parse(obj.hash.data);
		return obj.fn(extend(obj1, obj2));
	});

};

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}