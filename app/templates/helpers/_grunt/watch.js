module.exports = {
	configFiles: {
		files: [
			'<%%= paths.helper %>/_grunt/*.js',
			'Gruntfile.js'
		],
		options: {
			reload: true
		}
	},
    js: {
        files: '<%%= paths.src %>/js/{,*/}*.js',
        tasks: 'sync:js'
    },
    assets: {
        files: '<%%= paths.src %>/assets/**/*',
        tasks: 'sync:assets'
    },
	livereload: {
		options: {
			livereload: '<%%= connect.options.livereload %>'
		},
		files: [
			'<%%= paths.dist %>/{,*/}*.html',
			'<%%= paths.dist %>/css/{,*/}*.css', // if you want to use browser-sync for css just comment out this line
			'<%%= paths.dist %>/js/{,*/}*.js',
			'<%%= paths.dist %>/assets/**/*'
		]
	}
<% if (features && features.length > 0) { if (features.indexOf('sassInsteadOfCompass') != -1) { %>,
	scss: {
		files: '<%%= paths.src %>/scss/**/*',
		tasks: 'sass:dist'
	}<% }} %><% if(installAssemble != false){ %>,
	templates: {
		files: ['<%%= paths.src %>/{data,templates/layouts,templates/partials}/**/{,*/}*.{js,md,hbs,yml,json}'],
	    tasks: ['assemble'],
	    options: {
			spawn: false
		}
	},
    pages: {
        files: ['<%%= paths.src %>/templates/pages/**/{,*/}*.hbs'],
        tasks: ['assemble:pages'],
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
    } <% } %>
    <% if(modules && modules.length > 0 && modules.indexOf('grunt-connect-proxy') !== -1 && proxyHost && proxyPort) { %>,
    proxies: {
        files: ['Gruntfile.js']
    }<% } %>
};