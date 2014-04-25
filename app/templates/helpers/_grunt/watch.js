module.exports = {
	options: {
		livereload: '<%%= connect.options.livereload %>',
		spawn: false
	},
    js: {
        files: '<%%= paths.src %>/js/{,*/}*.js',
        tasks: 'sync:js'
    },
    assets: {
        files: '<%%= paths.src %>/assets/**/*',
        tasks: 'sync:assets'
    },<% if (features && features.length > 0) { if (features.indexOf('sassInsteadOfCompass') != -1) { %>
	scss: {
		files: '<%%= paths.src %>/scss/**/*',
		tasks: 'sass:dist'
	}, <% }} %><% if(installAssemble != false){ %>
	templates: {
		files: ['<%%= paths.src %>/{data,templates/layouts,templates/partials}/**/{,*/}*.{js,md,hbs,yml,json}'],
	    tasks: ['assemble']
	    },
    pages: {
        files: ['<%%= paths.src %>/templates/pages/**/{,*/}*.hbs'],
        tasks: ['assemble:pages']
    },
    ajax: {
        files: ['<%%= paths.src %>/templates/ajax/**/{,*/}*.hbs'],
        tasks: ['assemble:ajax']
    } <% } %>
    <% if(modules && modules.length > 0 && modules.indexOf('grunt-connect-proxy') !== -1 && proxyHost && proxyPort) { %>,
    proxies: {
        files: ['Gruntfile.js']
    }<% } %>
};