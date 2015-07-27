exports.questions = function () {
	return [
		{
			when: function (answers) {
				return answers.taskRunner
					&& answers.taskRunner.length > 0
					&& answers.taskRunner.indexOf('grunt') !== -1;
			},
			name: 'gruntModules',
			type: 'checkbox',
			message: 'Which grunt modules do you want to use?',
			choices: [
				{name: 'grunt-accessibility'},
				{name: 'grunt-autoprefixer', checked: true},
				{name: 'grunt-bless'},
				{name: 'grunt-browser-sync', checked: true},
				{name: 'grunt-browserify', checked: true},
				{name: 'grunt-combine-mq', checked: true},
				{name: 'grunt-connect-proxy (CORS, Basic Auth and http methods)', value: 'grunt-connect-proxy'},
				{name: 'grunt-contrib-htmlmin'},
				{name: 'grunt-contrib-requirejs'},
				{name: 'grunt-contrib-uglify'},
				{name: 'grunt-csscomb'},
				{name: 'grunt-dr-svg-sprites', checked: true},
				{name: 'grunt-grunticon'},
				{name: 'grunt-image-size-export'},
				{name: 'grunt-jsdoc'},
				{name: 'grunt-modernizr'},
				{name: 'grunt-packager'},
				{name: 'grunt-phantomas'},
				{name: 'grunt-photobox'},
				{name: 'grunt-postcss-separator'},
				{name: 'grunt-responsive-images'},
				{name: 'grunt-svgmin'},
				{name: 'grunt-ts'},
				{name: 'grunt-version', checked: true}
			],
			default: this.config.get('gruntModules')
		}, {
			when: function (answers) {
				return answers.gruntModules
					&& answers.gruntModules.length > 0
					&& answers.gruntModules.indexOf('grunt-connect-proxy') !== -1;
			},
			type: 'input',
			name: 'proxyHost',
			validate: function (answer) {
				if (typeof answer !== 'string' || answer.length < 5 || answer.indexOf('.') === -1) {
					return false;
				} else {
					return true;
				}
			},
			message: 'Which host do you want me to proxy (e.g. domain.com)?',
			default: this.config.get('proxyHost')
		}, {
			when: function (answers) {
				return answers.gruntModules
					&& answers.gruntModules.length > 0
					&& answers.gruntModules.indexOf('grunt-connect-proxy') !== -1
					&& answers.proxyHost;
			},
			type: 'input',
			name: 'proxyPort',
			validate: function (answer) {
				if (isNaN(Number(answer))) {
					return false;
				} else {
					return true;
				}
			},
			message: 'Which port should be used for the proxy?',
			default: this.config.get('proxyPort')
		}
	];
};

exports.setup = function () {
	this.gruntModules = this.config.get('gruntModules') || [];
};

exports.scaffold = function () {
	// Copy standard files
	this.template('Gruntfile.js.ejs', 'Gruntfile.js');
	this.mkdir('helpers/_grunt');

	if (this.taskRunner.indexOf('grunt') != -1 && this.taskRunner.indexOf('gulp') == -1) {
		this.template('helpers/_grunt/_clean.js.ejs', 'helpers/_grunt/clean.js');
		this.template('helpers/_grunt/_concurrent.js.ejs', 'helpers/_grunt/concurrent.js');
		this.template('helpers/_grunt/connect.js', 'helpers/_grunt/connect.js');
		this.copy('helpers/_grunt/cssmin.js', 'helpers/_grunt/cssmin.js');
		this.copy('helpers/_grunt/htmlhint.js', 'helpers/_grunt/htmlhint.js');
		this.copy('helpers/_grunt/jshint.js', 'helpers/_grunt/jshint.js');
		this.copy('helpers/_grunt/jsbeautifier.js', 'helpers/_grunt/jsbeautifier.js');
		this.copy('helpers/task-configs/.jsbeautifierrc', 'helpers/task-configs/.jsbeautifierrc');
		this.template('helpers/_grunt/_sync.js.ejs', 'helpers/_grunt/sync.js');
		this.template('helpers/_grunt/_watch.js.ejs', 'helpers/_grunt/watch.js');
	}

	if (!this.gruntModules && !this.gruntModules.length) return;

	// Grunt modules are splitted up in separate files and modules
	if (this.gruntModules.indexOf('grunt-accessibility') != -1) {
		this.copy('helpers/_grunt/accessibility.js', 'helpers/_grunt/accessibility.js');
	}
	if (this.gruntModules.indexOf('grunt-autoprefixer') != -1) {
		this.copy('helpers/_grunt/autoprefixer.js', 'helpers/_grunt/autoprefixer.js');
	}
	if (this.gruntModules.indexOf('grunt-bless') != -1) {
		this.copy('helpers/_grunt/bless.js', 'helpers/_grunt/bless.js');
	}
	if (this.gruntModules.indexOf('grunt-browser-sync') != -1) {
		this.template('helpers/_grunt/_browserSync.js.ejs', 'helpers/_grunt/browserSync.js');
	}
	if (this.gruntModules.indexOf('grunt-browserify') != -1) {
		this.template('helpers/_grunt/_browserify.js.ejs', 'helpers/_grunt/browserify.js');
	}
	if (this.gruntModules.indexOf('grunt-postcss-separator') != -1) {
		this.copy('helpers/_grunt/_postcssSeparator.js.ejs', 'helpers/_grunt/postcssSeparator.js');
	}
	if (this.gruntModules.indexOf('grunt-csscomb') != -1) {
		this.copy('helpers/_grunt/csscomb.js', 'helpers/_grunt/csscomb.js');
		this.copy('helpers/task-configs/csscomb.json', 'helpers/task-configs/csscomb.json');
	}
	if (this.gruntModules.indexOf('grunt-contrib-htmlmin') != -1) {
		this.copy('helpers/_grunt/htmlmin.js', 'helpers/_grunt/htmlmin.js');
	}
	if (this.gruntModules.indexOf('grunt-contrib-requirejs') != -1) {
		this.copy('helpers/_grunt/requirejs.js', 'helpers/_grunt/requirejs.js');
	}
	if (this.gruntModules.indexOf('grunt-contrib-uglify') != -1) {
		this.template('helpers/_grunt/_uglify.js.ejs', 'helpers/_grunt/uglify.js');
	}
	if (this.gruntModules.indexOf('grunt-combine-mq') != -1) {
		this.copy('helpers/_grunt/combine_mq.js', 'helpers/_grunt/combine_mq.js');
	}
	if (this.gruntModules.indexOf('grunt-dr-svg-sprites') != -1) {
		this.mkdir('resources/scss/icons');
		this.template('helpers/_grunt/_dr-svg-sprites.js.ejs', 'helpers/_grunt/dr-svg-sprites.js');
		this.copy('helpers/templates/svg-sprites/stylesheet.hbs');
	}
	if (this.gruntModules.indexOf('grunt-grunticon') != -1) {
		this.directory('resources/scss/icons', 'resources/scss/icons');
		this.directory('helpers/templates/grunticon', 'helpers/templates/grunticon');
		this.template('helpers/_grunt/_grunticon.js.ejs', 'helpers/_grunt/grunticon.js');
	}
	if (this.gruntModules.indexOf('grunt-image-size-export') != -1) {
		this.copy('helpers/_grunt/imageSizeExport.js', 'helpers/_grunt/imageSizeExport.js');
	}
	if (this.gruntModules.indexOf('grunt-jsdoc') != -1 || (this.features.indexOf('installDocs') != -1)) {
		this.copy('helpers/_grunt/jsdoc.js');
	}
	if (this.gruntModules.indexOf('grunt-modernizr') != -1) {
		this.copy('helpers/_grunt/modernizr.js', 'helpers/_grunt/modernizr.js');
	}
	if (this.gruntModules.indexOf('grunt-packager') != -1) {
		this.copy('resources/js/project.jspackcfg');
		this.copy('helpers/_grunt/packager.js', 'helpers/_grunt/packager.js');
	}
	if (this.gruntModules.indexOf('grunt-phantomas') != -1) {
		this.copy('helpers/_grunt/phantomas.js', 'helpers/_grunt/phantomas.js');
	}
	if (this.gruntModules.indexOf('grunt-photobox') != -1) {
		this.template('helpers/_grunt/photobox.js', 'helpers/_grunt/photobox.js');
	}
	if (this.gruntModules.indexOf('grunt-responsive-images') != -1) {
		this.copy('helpers/_grunt/responsive_images.js', 'helpers/_grunt/responsive_images.js');
	}
	if (this.gruntModules.indexOf('grunt-svgmin') != -1) {
		this.copy('helpers/_grunt/svgmin.js', 'helpers/_grunt/svgmin.js');
	}
	if (this.gruntModules.indexOf('grunt-version') != -1) {
		this.copy('helpers/_grunt/version.js', 'helpers/_grunt/version.js');
		this.copy('resources/templating/partials/blocks/b-version.hbs', 'resources/templating/partials/blocks/b-version.hbs');
	}

	if (this.gruntModules.indexOf('grunt-grunticon') != -1 || this.gruntModules.indexOf('grunt-dr-svg-sprites') != -1) {
		this.template('helpers/_grunt/_replace.js.ejs', 'helpers/_grunt/replace.js');
	}

	if (this.gruntModules.indexOf('grunt-grunticon') != -1 && this.gruntModules.indexOf('grunt-postcss-separator') != -1) {
		this.copy('resources/js/vendor/loadCSS.js', 'resources/js/vendor/loadCSS.js');
	}
};