/**
 * TODO: Generic props expose for custom mixins
 */
const helpers = require('../../lib/helpers');

module.exports = function save(props) {
	const cutter = (str) => {
		return str ? str.charAt(0) : '';
	};
	const prefixer = (str) => {
		return str ? str + '-' : '';
	};

	this.path = this.options.path;
	this.name = this.options.name ? this.options.name : props.bpName;
	this.bpTypeName = props.bpTypeName === 'global' ? '' : props.bpTypeName;
	this.bpTypePrefix = this.bpTypeName ? prefixer(cutter(this.bpTypeName)) : '';
	this.customTypeName = props.customTypeName || false;
	this.customTypePrefix = props.customTypePrefix || false;
	this.bpWrapWith = props.bpWithWrapWith;
	this.bpWithJs = props.bpWithJs || false;
	this.bpAdditionalFiles = props.bpAdditionalFiles || [];
	this.cleanPathType = this.bpTypeName === 'utility' ? 'utilitie' : this.bpTypeName;

	if (this.options.component ||
		this.options.utility ||
		this.options.custom ||
		this.bpTypeName === 'custom') {
		if (this.options.component) {
			this.bpTypeName = 'component';
			this.bpTypePrefix = 'c-';
		} else if (this.options.utility) {
			this.bpTypeName = 'utility';
			this.bpTypePrefix = 'u-';
		} else if (this.options.custom || this.bpTypeName === 'custom') {
			this.bpTypeName = this.customTypeName;
			this.bpTypePrefix = prefixer(this.customTypePrefix);
		}
	}

	this.filename = helpers.hyphenate(this.name);
	this.bpName = helpers.toCamelCase(this.name);
	this.bpJsName = helpers.capitalizeFirstLetter(this.bpName);
};