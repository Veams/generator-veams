'use strict';

var helperPath = 'configs/';
var srcPath = 'src/';
var config = module.exports;

/**
 * Paths Object
 */
config.paths = {
	appPath: 'app/templates/',
	srcPath: srcPath,
	hbsHelperPath: srcPath + 'shared/utilities/template-helpers',
	helperPath: helperPath,
	gruntPath: helperPath + '_grunt/',
	gulpPath: helperPath + '_gulp/'
};

/**
 * Setups
 */
config.setup = {
	empty: {
		projectName: '',
		projectAuthor: '',
		selfContained: false,
		taskRunner: [],
		templateEngine: '',
		mangonyExpress: false,
		installExtendedLayout: false,
		installPlugin: false,
		gulpModules: [],
		gruntModules: [],
		features: [],
		jsLibs: [],
		cssLibs: [],
		testAndQA: false,
		testAndQALibs: [],
		veamsPackages: false,
		docs: []
	},
	defaults: {
		projectName: '',
		projectAuthor: '',
		selfContained: true,
		taskRunner: [
			'grunt'
		],
		templateEngine: '',
		mangonyExpress: false,
		installExtendedLayout: false,
		installPlugin: false,
		gulpModules: [],
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
		docs: []
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