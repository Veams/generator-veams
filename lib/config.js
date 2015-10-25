var helperPath = 'helpers/';
var srcPath = 'resources/';
var config = module.exports;

/**
 * Paths Object
 */
config.paths = {
	appPath: 'app/templates/',
	srcPath: srcPath,
	hbsHelperPath: srcPath + 'templating/helpers',
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
		taskRunner: [],
		templateEngine: '',
		installExtendedLayout: false,
		installPlugin: false,
		gulpModules: [],
		gruntModules: [],
		features: [],
		jsLibs: [],
		cssLibs: [],
		testAndQA: false,
		testAndQALibs: [],
		veamsPackages: [],
		docs: []
	},
	defaults: {
		projectName: '',
		projectAuthor: '',
		taskRunner: [
			'grunt'
		],
		templateEngine: '',
		installExtendedLayout: true,
		installPlugin: false,
		gulpModules: [],
		gruntModules: [
			'grunt-combine-mq',
			'grunt-dr-svg-sprites'
		],
		features: [],
		jsLibs: [],
		cssLibs: [],
		testAndQA: false,
		testAndQALibs: [],
		veamsPackages: [],
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