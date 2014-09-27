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
			'<%%= paths.dev %>/css/{,*/}*.css',
			'<%%= paths.dev %>/js/{,*/}*.js',
			'<%%= paths.dev %>/img/**/*.{jpg,png}'
		]
	},
    js: {
        files: '<%%= paths.src %>/js/{,*/}*.js',
        tasks: 'sync:js'
    },
    ajax: {
        files: '<%%= paths.src %>/ajax/**/*.{json,html}',
        tasks: 'sync:assets'
    },
    assets: {
        files: [
			'<%%= paths.src %>/assets/**/*'<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-svgmin') != -1) { %>,
			'!<%%= paths.src %>/assets/img/svg/**/*'<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-dr-svg-sprites') != -1) { %>,
			'!<%%= paths.src %>/assets/img/svgmin/**/*'<% }} %><% }} %>
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
		tasks: 'sass:dist'<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-browser-sync') != -1) { %>,
	    options: {
			spawn: false
		}<% }} %>
	}<% if (features.indexOf('supportIE8') != -1) { %>,
	scssIE: {
		files: '<%%= paths.src %>/scss/ie8.scss',
		tasks: 'sass:ie'
	}<% } %><% if (features.indexOf('installDocs') != -1) { %>,
	scssDocs: {
		files: '<%%= paths.src %>/scss/docs/*',
		tasks: 'sass:docs'
	}<% } %><% }} %><% if(installAssemble != false){ %>,
	templates: {
		files: ['<%%= paths.src %>/{data,templates/layouts,templates/partials}/**/{,*/}*.{md,hbs,yml,json}'],
	    tasks: ['newer:assemble']<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-browser-sync') != -1) { %>,
	    options: {
			spawn: false
		}<% }} %>
	},
    pages: {
        files: ['<%%= paths.src %>/templates/pages/**/{,*/}*.hbs'],
        tasks: ['newer:assemble:pages']<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-browser-sync') != -1) { %>,
	    options: {
			spawn: false
		}<% }} %>
    }<% if (features.indexOf('installDocs') != -1) { %>,
    docs: {
        files: ['<%%= paths.src %>/templates/docs/**/{,*/}*.hbs'],
        tasks: ['newer:assemble:docs']<% if (modules && modules.length > 0) { if (modules.indexOf('grunt-browser-sync') != -1) { %>,
	    options: {
			spawn: false
		}<% }} %>
    }<% } %><% } %><% if(modules && modules.length > 0 && modules.indexOf('grunt-connect-proxy') !== -1 && proxyHost && proxyPort) { %>,
    proxies: {
        files: ['Gruntfile.js']
    }<% } %>
};