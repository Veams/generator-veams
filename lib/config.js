var config = module.exports;

config.paths = {
	appPath: 'app/templates/',
	srcPath: 'resources/',
	hbsHelperPath: 'resources/templating/helpers',
	helperPath: 'helpers/',
	gruntPath: 'helpers/_grunt/',
	gulpPath: 'helpers/_gulp/'
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
		installProxy: false,
		proxyHost: '0.0.0.0 ',
		proxyPort: 80
	}
};