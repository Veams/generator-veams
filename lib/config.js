var helperPath = 'helpers/';
var srcPath = 'resources/';
var config = module.exports;

config.paths = {
	appPath: 'app/templates/',
	srcPath: srcPath,
	hbsHelperPath: srcPath + 'templating/helpers',
	helperPath: helperPath,
	gruntPath: helperPath + '_grunt/',
	gulpPath: helperPath + '_gulp/'
};

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
	}
};