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
		
		require('jit-grunt')(grunt, { <% if (modules.indexOf('grunt-combine-media-queries') != -1) { %>
			cmq: 'grunt-combine-media-queries' <% } %>
		});
        // measures the time each task takes
        require('time-grunt')(grunt);

        var options = {
            // Project settings
            config: {
                // in this directory you can find your grunt config tasks
                src: "helpers/_grunt/*.js"
            },
            paths: {
                // Configurable paths
                src: 'resources',
                helper: 'helpers',
                dist: '_output'
            },
            ports: {
                app: '9000',
                test: '9001',
                livereload: 35729
            }
        };

        // Load grunt configurations automatically
        var configs = require('load-grunt-configs')(grunt, options);

        // Define the configuration for all the tasks
        grunt.initConfig(configs);
		
	 // Simple Tasks
	 <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-grunticon') { %>
		grunt.registerTask('icons', [
			'grunticon',
			'clean:grunticon',
			'replace'
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
         <% if(features && features.length > 0){ if(features.indexOf('sassInsteadOfCompass') != -1) { %>
        grunt.registerTask('watchCSS', [
             'sass:dist'
        ]); <% } else { %>
		grunt.registerTask('cssDev', [
			'bgShell:devCompass'
		]);
		grunt.registerTask('watchCSS', [
			'bgShell:watchCompass'
		]);
		grunt.registerTask('cssProd', [
			'bgShell:prodCompass'
		]); <% }} else { %>
		grunt.registerTask('cssDev', [
			'bgShell:devCompass'
			]);
		grunt.registerTask('watchCSS', [
			'bgShell:watchCompass'
		]);
		grunt.registerTask('cssProd', [
			'bgShell:prodCompass'
		]); <% } %>
		grunt.registerTask('watchJS', [
			'sync:js'
		]);
		grunt.registerTask('check-html', [
			'htmlhint'
		]);
		grunt.registerTask('check-js', [
			'jshint'
		]);
		grunt.registerTask('beauty-files', [
			'jsbeautifier'
		]);
		grunt.registerTask('beauty-scss', [
			'prettysass'
		]);

	// Advanced Tasks
	  grunt.registerTask('server', [
		'concurrent:rendering',
		'concurrent:syncing',
		'watchCSS',<% if(modules && modules.length >= 0){if(modules.indexOf('grunt-browser-sync') == -1) { %>
		'connect:livereload', <% }} if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-browser-sync') { %>
		'browser_sync', <% } %><%}); %><%} %><%} %>
		'watch'
	  ]);
	  <% if(modules && modules.length > 0 && modules.indexOf('grunt-connect-proxy') !== -1 && proxyHost && proxyPort) { %>
		grunt.registerTask('devProxy', [
			'configureProxies:proxy', 
			'connect:proxy',
			'watch:proxies'
		]);
	  <% } %>
	  grunt.registerTask('build', [
		'clean',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>
		'js',<% } %><%}); %><%} %><%} %>
		'jsbeautifier:js',
		'concurrent:syncing', <% if(features && features.length > 0){ if(features.indexOf('sassInsteadOfCompass') != -1) { %>
		'watchCSS',<% } else { %>
		'cssProd',<% }} else { %>
		'cssProd',<% } %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-combine-media-queries') { %>
		'cmq',<% } %><%}); %><%} %><%} %><% if(features && features.length > 0){ if(features.indexOf('mobileFirst') != -1) { %>
		'comment-media-queries:dist',<% }} %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-autoprefixer') { %>
		'autoprefixer',<% } %><%}); %><%} %><%} %>
		'cssmin',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-bless') { %>
		'bless', <% } %><%}); %><%} %><%} %>		
		'concurrent:build',
		'jsbeautifier:html',
		'check-html'
	  ]);

	  grunt.registerTask('default', [
		'server'
	  ]);

	};
