module.exports = {
	js: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%%= paths.src %>/js',
				src: '**/*',
				dest: '<%%= paths.dev %>/js'
			}
		]
	},
	assets: {
		files: [
			// includes files within path and its sub-directories
			{
				cwd: '<%%= paths.src %>/assets',
				src: '**/{,*/}*',
				dest: '<%%= paths.dev %>'
			}
		]
    }<% if (features && features.length > 0 && features.indexOf('installDocs') != -1) { %>,
	highlightjs: {
		files: [
			// includes files within path and its sub-directories
			{
			cwd: '<%%= paths.src %>/bower_components/highlightjs',
			src: 'highlight.pack.js',
			dest: '<%%= paths.dev %>/bower_components'
			}
		]
	}<% } %><% if(jsLibs && jsLibs.length > 0){ %>,<% if (jsLibs.indexOf('requirejs') != -1) { %>
    requirejs: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%%= paths.src %>/bower_components/requirejs',
                src: 'require.js',
                dest: '<%%= paths.dev %>/bower_components/requirejs'
            }
	]
			},<% } %><% if (jsLibs.indexOf('backbone') != -1) { %>
    backbone: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%%= paths.src %>/bower_components/backbone',
                src: 'backbone.js',
                dest: '<%%= paths.dev %>/bower_components/backbone'
            }
        ]
    },
    underscore: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%%= paths.src %>/bower_components/underscore',
                src: 'underscore.js',
                dest: '<%%= paths.dev %>/bower_components/underscore'
            }
        ]
    },<% } %><% if (jsLibs.indexOf('angular') != -1) { %>
    angularjs: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%%= paths.src %>/bower_components/angular',
                src: 'angular.js',
                dest: '<%%= paths.dev %>/bower_components/angular'
            }
        ]
    },<% } %><% if (jsLibs.indexOf('jquery') != -1) { %>
    jquery: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%%= paths.src %>/bower_components/jquery/dist',
                src: 'jquery.js',
                dest: '<%%= paths.dev %>/bower_components/jquery/dist'
            }
        ]
    }<% } %><% } %>
};