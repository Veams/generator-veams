'use strict';

/**
 * Helper utilities
 */
var pgHelpers = module.exports;

pgHelpers.cleanupPath = function (path) {
	if (path !== '') {
		return path.replace(/\/?$/, '/');
	}
};