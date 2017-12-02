'use strict';

var helperPath = 'configs/';
var srcPath = 'src/app/';
var config = module.exports;

/**
 * Paths Object
 */
config.paths = {
	bpPath: 'blueprint',
	appPath: 'app/templates/',
	srcPath: srcPath,
	hbsHelperPath: srcPath + 'app/shared/utilities/template-helpers',
	helperPath: helperPath,
	gruntPath: helperPath + 'tasks/_grunt/'
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
		server: [],
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
		server: [],
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