/**
 */
const helpers = require('../../lib/helpers');
const config = require('../../lib/config');

module.exports = function save(props) {
	const cutter = (str) => {
		return str ? str.charAt(0) : '';
	};
	const prefixer = (str) => {
		return str ? str + '-' : '';
	};

	this.props = props;
	this.blueprints = props.blueprints;
	this.path = this.options.path.replace(/\\/g, '/');
	this.name = this.options.name ? this.options.name : props.bpName;
	this.bpTypeName = props.bpTypeName === 'global' ? '' : props.bpTypeName;
	this.bpTypePrefix = this.bpTypeName ? prefixer(cutter(this.bpTypeName)) : '';
	this.customTypeName = this.bpTypeName = props.customTypeName || this.options.type;
	this.customTypePrefix = props.customTypePrefix || false;
	this.cleanPathType = this.bpTypeName === 'utility' ? 'utilitie' : this.bpTypeName;

	if (this.options.type === 'component') {
		this.bpTypePrefix = 'c-';
	} else if (this.options.type === 'utility') {
		this.bpTypePrefix = 'u-';
	} else {
		this.bpTypeName = this.customTypeName;
		this.bpTypePrefix = prefixer(this.customTypePrefix);
	}

	this.filename = helpers.hyphenate(this.name);
	this.bpName = helpers.toCamelCase(this.name);
	this.bpNameUppercase = this.bpName.toUpperCase();
	this.bpJsName = helpers.capitalizeFirstLetter(this.bpName);
};