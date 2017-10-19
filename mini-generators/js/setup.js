import {handlebarsId, veamsJSPreset} from './config';
const _ = require('lodash');

export default function setup() {
	this.jsLibs = this.config.get('jsLibs') || [];
	if (this.config.get('veamsPackages')) {
		if (this.config.get('projectType') === 'staticPageApp') {
			this.jsLibs.push(handlebarsId);
		}
		// merge array and remove duplicates
		this.jsLibs = _.union(this.config.get('jsLibs'), veamsJSPreset);
	}
};
