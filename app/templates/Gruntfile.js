	/*
	 * Generated on <%= (new Date).toISOString().split('T')[0] %>
	 * <%= pkg.name %> v<%= pkg.version %>
	 * <%= pkg.homepage %>
	 *
	 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>
	 * Licensed under the MIT license.
	 */

	'use strict';

	// # Globbing
	// for performance reasons we're only matching one level down:
	// '<%%= config.src %>/templates/pages/{,*/}*.hbs'
	// use this if you want to match all subfolders:
	// '<%%= config.src %>/templates/pages/**/*.hbs'

	module.exports = function(grunt) {

	  // measures the time each task takes
	  require('time-grunt')(grunt);

	  var options = {
            // Project settings
            config : {
				// in this directory you can find your grunt config tasks
                src: "helpers/_grunt/*.js"
            },
            paths: {
                // Configurable paths
                src: 'resources',
                helper: 'helpers',
                dist: '_output'
            },
            ports : {
                app : '9000',
                test : '9001',
                livereload : 35729
            }
        };

        // Load grunt configurations automatically
        var configs = require('load-grunt-configs')(grunt, options);

        // Define the configuration for all the tasks
        grunt.initConfig(configs);

	  // Load Tasks
	  <% if(installAssemble){ %>
	  grunt.loadNpmTasks('assemble'); <% } %><% if(installDocs){ %>
	  grunt.loadNpmTasks('grunt-contrib-copy');
	  grunt.loadNpmTasks('grunt-styleguide');<% } %><% if(mobileFirst){ %>
      grunt.loadNpmTasks('grunt-comment-media-queries'); <% } %>
	  grunt.loadNpmTasks('grunt-newer');
	  grunt.loadNpmTasks('grunt-htmlhint');
	  grunt.loadNpmTasks('grunt-prettysass');
	  grunt.loadNpmTasks('grunt-bg-shell');
	  grunt.loadNpmTasks('grunt-sync');
	  grunt.loadNpmTasks('grunt-contrib-clean');
	  grunt.loadNpmTasks('grunt-contrib-connect');
	  grunt.loadNpmTasks('grunt-concurrent');
	  grunt.loadNpmTasks('grunt-contrib-cssmin');
	  grunt.loadNpmTasks('grunt-contrib-watch'); 
	  <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { %>
	  grunt.loadNpmTasks('<%= name %>'); <%}); %><%} %><%} %>
	  
	 // Simple Tasks
	 <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-grunticon') { %>
		grunt.registerTask('icons', [
			'grunticon'
		]); <% } %><% if(name == 'dr-grunt-svg-sprites') { %>
		grunt.registerTask('sprites', [
			'svg-sprites'
		]); <% } %><% if(name == 'grunt-packager') { %>
		grunt.registerTask('js', [
			'packager'
		]); <% } %><% if(name == 'grunt-contrib-compass') { %>
		grunt.registerTask('css', [
			'compass:dist'
		]);<% } %><% if(name == 'grunt-photobox') { %>
		grunt.registerTask('photoLocal', [
	        'photobox:local'
	    ]);	
		grunt.registerTask('photoDev', [
	        'photobox:dev'
	    ]);
		grunt.registerTask('photoProd', [
	        'photobox:prod'
	    ]);<% } %><%}); %><%} %><%} %>
	  
		grunt.registerTask('cssDev', [
	        'bgShell:devCompass'
	    ]);
	    grunt.registerTask('watchCSS', [
	        'bgShell:watchCompass'
	    ]);
	    grunt.registerTask('cssProd', [
	        'bgShell:prodCompass'
	    ]);
		grunt.registerTask('watchJS', [
			'sync:js'
		]);
		grunt.registerTask('check-html', [
			'htmlhint'
		]);
		grunt.registerTask('prettyscss', [
			'prettysass'
		]);

	// Advanced Tasks
	  grunt.registerTask('server', [
		'concurrent:rendering',
		'concurrent:syncing',
	    'watchCSS',<% if(modules && modules.length > 0){if(modules.indexOf('grunt-browser-sync') == -1) { %>
	    'connect:livereload', <% }} if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-browser-sync') { %>
		'browser_sync', <% } %><%}); %><%} %><%} %>
	    'watch'
	  ]);

	  grunt.registerTask('build', [
	    'clean',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>
		'js',<% } %><%}); %><%} %><%} %>
		'concurrent:syncing',
	    'cssProd',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-combine-media-queries') { %>
		'cmq',<% } %><%}); %><%} %><%} %><% if(mobileFirst){ %>
		'comment-media-queries:dist',<%} %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-autoprefixer') { %>
		'autoprefixer',<% } %><%}); %><%} %><%} %>
		'cssmin',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-bless') { %>
		'bless', <% } %><%}); %><%} %><%} %>
		'concurrent:build'
	  ]);

	  grunt.registerTask('default', [
	    'server'
	  ]);

	};
