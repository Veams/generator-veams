'use strict';

module.exports = function setup() {
	this.server = this.config.get('server') || [];
};