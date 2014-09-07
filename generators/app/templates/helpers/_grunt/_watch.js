module.exports = {
	configFiles: {
		options: {
			reload: true
		},
		files: [
			'<%%= paths.helper %>/_grunt/*.js',
			'Gruntfile.js'
		]
	},
	livereload: {
		options: {
			livereload: '<%%= connect.options.livereload %>'
		},
		files: [
			'<%%= paths.dev %>/{,*/}*.html',
			'<%%= paths.dev %>/css/{,*/}*.css', // if you want to use browser-sync for css just comment out this line
			'<%%= paths.dev %>/js/{,*/}*.js',
			'<%%= paths.dev %>/img/**/*.{jpg,png}'
		]
	},
    js: {
        files: '<%%= paths.src %>/js/{,*/}*.js',
        tasks: 'sync:js'
    },
    assets: {
        files: [
			'<%%= paths.src %>/assets/**/*'<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-svgmin') != -1) { %>,
			'!<%%= paths.src %>/assets/img/svg/**/*'<% }} %>
			],
        tasks: 'sync:assets'
    }<% if (features && features.length > 0) { if (features.indexOf('sassInsteadOfCompass') != -1) { %>,
	globbing: {
		options: {
		event: ['added', 'deleted']
		},
		files: [
			'<%%= paths.helper %>/_grunt/fileindex.js',
			'<%%= paths.src %>/scss/**/*.scss',
			'!<%%= paths.src %>/scss/_all.scss'
		],
		tasks: 'fileindex:libsassGlobbing'
	},
	fileindex: {
		files: [
			'<%%= paths.helper %>/_grunt/fileindex.js'
		],
		tasks: 'fileindex:libsassGlobbing'
	},
	scss: {
		files: '<%%= paths.src %>/scss/**/*',
		tasks: 'sass:dist',
		options: {
			spawn: false
		}
	}<% if (features.indexOf('supportIE8') != -1) { %>,
	scssIE: {
		files: '<%%= paths.src %>/scss/ie8.scss',
		tasks: 'sass:ie'
	}<% } %><% if (features.indexOf('installDocs') != -1) { %>,
	scssDocs: {
		files: '<%%= paths.src %>/scss/docs/*',
		tasks: 'sass:docs',
		options: {
			spawn: false
		}
	}<% } %><% }} %><% if(installAssemble != false){ %>,
	templates: {
		files: ['<%%= paths.src %>/{data,templates/layouts,templates/partials}/**/{,*/}*.{md,hbs,yml,json}'],
	    tasks: ['newer:assemble'],
	    options: {
			spawn: false
		}
	},
    pages: {
        files: ['<%%= paths.src %>/templates/pages/**/{,*/}*.hbs'],
        tasks: ['newer:assemble:pages'],
	    options: {
			spawn: false
		}
    },
    docs: {
        files: ['<%%= paths.src %>/templates/docs/**/{,*/}*.hbs'],
        tasks: ['newer:assemble:docs'],
	    options: {
			spawn: false
		}
    },
    ajax: {
        files: ['<%%= paths.src %>/templates/ajax/**/{,*/}*.hbs'],
        tasks: ['assemble:ajax'],
	    options: {
			spawn: false
		}
    } <% } %><% if(modules && modules.length > 0 && modules.indexOf('grunt-connect-proxy') !== -1 && proxyHost && proxyPort) { %>,
    proxies: {
        files: ['Gruntfile.js']
    }<% } %>
};