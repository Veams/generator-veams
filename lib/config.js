'use strict';

var helperPath = 'configs/';
var srcPath = 'src/';
var config = module.exports;

/**
 * Paths Object
 */
config.paths = {
	bpPath: 'blueprint',
	appPath: 'app/templates/',
	srcPath: srcPath,
	hbsHelperPath: srcPath + 'shared/utilities/template-helpers',
	helperPath: helperPath,
	gruntPath: helperPath + '_grunt/'
};

/**
 * Setups
 */
config.setup = {
	empty: {
		projectName: '',
		projectType: '',
		taskRunner: [],
		templateEngine: [],
		gruntModules: [],
		features: [],
		jsLibs: [],
		cssLibs: [],
		testAndQA: false,
		testAndQALibs: [],
		veamsPackages: true,
		docs: [],
		icons: [],
		images: [],
		cssPostProcessors: []
	},
	defaults: {
		projectName: 'static-page-app',
		projectType: [],
		taskRunner: [
			'grunt'
		],
		templateEngine: [],
		gruntModules: [
			'grunt-combine-mq',
			'grunt-dr-svg-sprites'
		],
		features: [],
		jsLibs: [],
		cssLibs: [],
		testAndQA: true,
		testAndQALibs: [
			'hintingHTML',
			'stylelint'
		],
		veamsPackages: true,
		docs: [],
		icons: [],
		images: [],
		cssPostProcessors: []
	}
};

/**
 * Events Object
 */
config.events = {
	depsIntalled: 'dependenciesInstalled',
	end: 'end'
};

config.saveSettings = function () {
};