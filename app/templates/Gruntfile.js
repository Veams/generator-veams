/*
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 * <%= pkg.name %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>
 * Licensed under the MIT license.
 */

'use strict';

// Timer
var timer = require("grunt-timer");

// # Globbing
// for performance reasons we're only matching one level down:
// '<%%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  // init timer
  timer.init(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'resources',
      dist: '_output'
    },
	
	bgShell: {
        _defaults: {
             bg: true
        },

        watchCompass: {
            cmd: 'compass watch'
        }, 
		
        devCompass: {
			bg: false,
            cmd: 'compass watch'
        }, 
		
		prodCompass: {
			bg: false,
			cmd: 'compass compile -e production --force'
		}
    },
	<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { 
				if(name == 'grunticon-sass') { %>
	'grunticon-sass': {
			icons: {
				options: {
					src: '<%%= config.src %>/img/svg/icons',
					dest: '<%%= config.src %>/scss/icons',

					datasvgcss: "_icons.data.svg.scss",
					datapngcss: "_icons.data.png.scss",
					urlpngcss: "_icons.png.scss",

					previewhtml: false,
					loadersnippet: false,

					pngcrush: false,
					pngfolder: "../../../img/png_icons/",
					pngPath: '<%%= config.dist %>/img/png_icons/',

					pseudoselectors: true,
					oneimport: false
				}
			}
		}, <% } %><% if(name == 'dr-grunt-svg-sprites') { %>
	'svg-sprites': {
		options: {
		  paths: {
					spriteElements: "<%%= config.src %>/img/svg",
					sprites: "<%%= config.dist %>/img/sprites",
					css: "<%%= config.src %>/scss/icons"
				},
		  sizes: {
			large: 125,
			medium: 100,
			small: 50
		  },
		  refSize: "medium",
		  unit: 5,
		},
	}, <% } %><% if(name == 'grunt-packager') { %>
	packager: {
		default: {
			options: {
				config: '<%%= config.dist %>/js/project.jspackcfg',
				cwd: '<%%= config.dist %>/js/'
			}
		}
	}, <% } %><% if(name == 'grunt-browser-sync') { %>
	browser_sync: {
          files: {
              src : '<%%= config.dist %>/css/*.css'
          },
          options: {
			  host: "localhost",
              watchTask: true,
			  ghostMode: {
                scroll: true,
                links: true,
                forms: true
            }
          }
      }, <% } %><% if(name == 'grunt-contrib-compass') { %>
	  compass: {
          dist: {
              options: {
                  config: 'config.rb',  // css_dir = 'dev/css'
                  cssDir: '<%%= config.dist %>/css'
              }
          }
      }, <% } %><% if(name == 'grunt-htmlhint') { %> 
      htmlhint: {
          all: {
              options: { // Want to know what configurations are available? http://htmlhint.com/
				htmlhintrc: '.htmlhintrc'
			  },
              src: ['<%%= config.dist %>/*.html']
          }
      }, <% } %><% if(name == 'grunt-photobox') { %>
        photobox: {
            local: {
                options: {
                    screenSizes: [ '600x900', '1000x900', '1200x900' ],
                    urls: [
                        'http://localhost:9000/index.html',
                        'http://localhost:9000/subpage.html',
                        'http://localhost:9000/sitemap.html'
                    ]
                }
            },
			dev: {
                options: {
                    screenSizes: [ '600x900', '1000x900', '1200x900' ],
                    urls: [
                        '<%= projectURL %>'
                    ]
                }
            },
            prod: {
                options: {
                    screenSizes: [ '600x900', '1000x900', '1200x900' ],
                    urls: [
                    ]
                }
            }
        }, <% } %><% if(name == 'grunt-prettysass') { %>  
      prettysass: {
            options: {
                alphabetize: true,
                indent: "t"
            },
            scss: {
                src: ['<%%= config.src %>/scss/**/*.scss']
            }
        },
	  <% } %><%}); %><%} %><%} %>
	sync: {
		js: {
			files: [
				  // includes files within path and its sub-directories
				  {
					cwd: 'resources/js',
					src: '**', 
					dest: '_output/js'
				  }
			]
		}
	},
    watch: {<% if(installAssemble === true){ %>
      assemble: {
        files: ['<%%= config.src %>/{data,templates}/**/{,*/}*.{md,hbs,yml,json}'],
        tasks: ['assemble']
      },<% } %>
	  js: {
			files: '<%= config.src %>/js/{,*/}*.js',
			tasks: 'sync:js'
	  },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.dist %>/{,*/}*.html',
          '<%%= config.dist %>/css/{,*/}*.css', // if you want to use browser-sync for css just comment out this line
          '<%%= config.dist %>/js/{,*/}*.js',
          '<%%= config.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%%= config.dist %>/media/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
		scss: {
			files: ['<%= config.src %>/scss/{,*/}*.scss']
		}
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%%= config.dist %>'
          ]
        }
      }
    },
	<% if(installAssemble === true){ %>
    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%%= config.dist %>',
          layout: '<%%= config.src %>/templates/layouts/default.hbs',
          data: '<%%= config.src %>/data/*.{json,yml}',
          helpers: '<%%= config.src %>/helpers/*.js',
          partials: '<%%= config.src %>/templates/partials/**/*.hbs'<% if(plugin && plugin.length > 0){ %>,
          plugins: [<% if(typeof plugin === 'object'){ _.each(plugin, function(name, i) { %>'<%= name %>'<% if(i < (plugin.length - 1)) { %>,<% } }); } else { %>'<%= name %>'<%} %>],<%}
          _.each(plugin, function(name, i) { if(name == 'permalinks') { %>
          permalinks: {
            preset: 'pretty'
          },<% }
          if(name == 'assemble-contrib-contextual') { %>
          contextual: {
            dest: 'tmp/'
          },<% }
          }); %>
        },
        files: {
          '<%%= config.dist %>/': ['<%%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%%= config.dist %>/**/*.{html,xml}']
	<% } %>
  });

  // Load Tasks
  <% if(installAssemble === true){ %>
  grunt.loadNpmTasks('assemble'); <% } %>
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { %>
  grunt.loadNpmTasks('<%= name %>'); <%}); %><%} %><%} %>
  
 // Simple Tasks
 <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { 
	if(name == 'grunticon-sass') { %>
	grunt.registerTask('icons', [
		'grunticon-sass'
	]); <% } %><% if(name == 'dr-grunt-svg-sprites') { %>
	grunt.registerTask('sprites', [
		'svg-sprites'
	]); <% } %><% if(name == 'grunt-packager') { %>
	grunt.registerTask('js', [
		'packager'
	]); <% } %><% if(name == 'grunt-contrib-compass') { %>
	grunt.registerTask('css', [
		'compass:dist'
	]);<% } %><% if(name == 'grunt-htmlhint') { %>
	grunt.registerTask('html', [
		'htmlhint'
	]);<% } %><% if(name == 'grunt-photobox') { %>
	grunt.registerTask('photoLocal', [
        'photobox:local'
    ]);	
	grunt.registerTask('photoDev', [
        'photobox:dev'
    ]);
	grunt.registerTask('photoProd', [
        'photobox:prod'
    ]);<% } %><% if(name == 'grunt-prettysass') { %>
	grunt.registerTask('prettyscss', [
		'prettysass'
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

// Advanced Tasks
  grunt.registerTask('server', [
 <% if(installAssemble === true){ %>'assemble',<% } %>
    'watchCSS',
    'connect:livereload', <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-browser-sync') { %>
	'browser_sync', <% } %><%}); %><%} %><%} %>
    'watch'
  ]);

  grunt.registerTask('build', [<% if(installAssemble === true){ %>
    'clean',
	'assemble',<% } %>
    'cssProd'<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-prettysass') { %>,
	'prettyscss'<% } %><%}); %><%} %><%} %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-photobox') { %>,
	'photoProd'<% } %><%}); %><%} %><%} %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>,
	'js'<% } %><%}); %><%} %><%} %>
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
