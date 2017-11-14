const _ = require('lodash');

module.exports = function setup() {
	this.images = this.config.get('images') || [];
};
