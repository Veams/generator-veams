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
	      helper: 'helper_files',
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
					if(name == 'grunt-grunticon') { %>
		grunticon: {
			icons: {
				files: [{
	                expand: true,
					cwd: '<%%= config.src %>/assets/img/svg/icons',
					src: ['*.svg', '*.png'],
					dest: "<%%= config.src %>/scss/icons"
				}],
				options: {
	                // optional grunticon config properties
					// SVGO compression, false is the default, true will make it so
					svgo: true,
					
					// PNG compression, false is the default, true will make it so
					pngcrush: false,
					
					// CSS filenames
					datasvgcss: "_icons.data.svg.scss",
					datapngcss: "_icons.data.png.scss",
					urlpngcss: "_icons.fallback.scss",

					// grunticon loader code snippet filename
					// loadersnippet: "grunticon.loader.js
					
					// folder name (within dest) for png output
					pngfolder: "../../assets/img/png_icons/",
					
					// prefix for CSS classnames
					cssprefix: "%icon-",
					
					// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
					// This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
					cssbasepath: "/"
				}
	        },
	        png: {
				files: [{
	                expand: true,
					cwd: '<%%= config.src %>/assets/img/svg/icons',
	                src: ['*.svg', '*.png'],
					dest: "<%%= config.src %>/scss/icons"
					}],
				options: {
	                // optional grunticon config properties
					// SVGO compression, false is the default, true will make it so
					svgo: false,

					// PNG compression, false is the default, true will make it so
					pngcrush: false,

					// CSS filenames
	                datasvgcss: "_icons.data.svg.ie8.scss",
	                datapngcss: "_icons.data.png.ie8.scss",
					urlpngcss: "_icons.fallback.scss",

	                // preview HTML filename
	                previewhtml: "preview.html",

	                // grunticon loader code snippet filename
	                loadersnippet: "grunticon.loader.js",


	                // folder name (within dest) for png output
					pngfolder: "../../assets/img/png_icons/",

					// prefix for CSS classnames
					cssprefix: "%icon-",

					// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
					// This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
					cssbasepath: "/",
	                template: "<%%= config.helper %>/templates/grunticon-png.hbs"
				}
	        }
	    }, <% } %><% if(name == 'dr-grunt-svg-sprites') { %>
		'svg-sprites': {
			options: {
			  paths: {
						spriteElements: "<%%= config.src %>/assets/img/svg",
						sprites: "<%%= config.src %>/assets/img/sprites",
						css: "<%%= config.src %>/scss/icons"
					},
			  sizes: {
				large: 125,
				medium: 100,
				small: 50
			  },
			  refSize: "medium",
			  unit: 5,
			  cssSuffix: "scss",
			  prefix: "sprite"
			},
		}, <% } %><% if(name == 'grunt-packager') { %>
		packager: {
			default: {
				options: {
					config: '<%%= config.src %>/js/project.jspackcfg',
					cwd: '<%%= config.src %>/js/'
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
	      },<% } %><% if(name == 'grunt-combine-media-queries') { %>
		cmq: {
			options: {
				log: true
			},
			your_target: {
				files: {
					'<%%= config.dist %>/css/': ['<%%= config.dist %>/css/{,*/}*.css']
				}
			}
		}, 
		cssmin: {
			options: {
				processImport: false
			},
			minify: {
				expand: true,
				cwd: '<%%= config.dist %>/css/',
				src: ['*.css'],
				dest: '<%%= config.dist %>/css/'
			}
		}, <% } %><% if(name == 'grunt-bless') { %>
		bless: {
			css: {
				options: {},
				files: {
					'<%%= config.dist %>/css/styles-svg.css': ['<%%= config.dist %>/css/styles-svg.css']
				}
			}
		}, <% } %><% if(name == 'grunt-photobox') { %>
	        photobox: {
	            local: {
	                options: {
	                    screenSizes: [ '600', '1000', '1200' ],
	                    urls: [
	                        'http://localhost:9000/index.html',
	                        'http://localhost:9000/subpage.html',
	                        'http://localhost:9000/sitemap.html'
	                    ]
	                }
	            },
				dev: {
	                options: {
	                    screenSizes: [ '600', '1000', '1200' ],
	                    urls: [
	                        '<%= projectURL %>'
	                    ]
	                }
	            },
	            prod: {
	                options: {
	                    screenSizes: [ '600', '1000', '1200' ],
	                    urls: [
	                    ]
	                }
	            }
	        }, <% } %><%}); %><%} %><%} %>
		  prettysass: {
	            options: {
	                alphabetize: false,
	                indent: "t"
	            },
	            scss: {
	                src: [
					'<%%= config.src %>/scss/drupal/**/*.scss',
					'<%%= config.src %>/scss/global/**/*.scss',
					'<%%= config.src %>/scss/icons/**/*.scss',
					'<%%= config.src %>/scss/modules/**/*.scss',
					'<%%= config.src %>/scss/utils/**/*.scss',
					]
	            }
	        },
		  htmlhint: {
	          all: {
	              options: { // Want to know what configurations are available? http://htmlhint.com/
					htmlhintrc: '<%%= config.helper %>/.htmlhintrc'
				  },
	              src: ['<%%= config.dist %>/*.html']
	          }
	      },
		sync: {
			js: {
				files: [
					  // includes files within path and its sub-directories
					  {
						cwd: '<%%= config.src %>/js',
						src: '**/*', 
						dest: '<%%= config.dist %>/js'
					  }
				]
			},
			assets: {
				files: [
					  // includes files within path and its sub-directories
					  {
						cwd: '<%%= config.src %>/assets',
	                    src: '**/{,*/}*',
	                    dest: '<%%= config.dist %>'
					  }
				]
			}
		},
		<% if(installDocs === true){ %>
		// Copy files for styleguide
	    copy: {
			styleguide: {
	            dest: '<%%= config.dist %>/styleguide/css/',
	            expand: true,
	            filter: 'isFile',
	            flatten: true,
	            src: ['<%%= config.dist %>/css/**/*.css']
	        }
	    },
		// Configuration for the styleguide output
	    styleguide: {
	        options: {
	            template: {
	                src: '<%%= config.helper %>/styleguide-template/'
	            },
	            name: 'Style Guide',
	            framework: {
	                name: 'kss'
	            }
	        },
	        all: {
	            files: [
	                {
	                    '<%%= config.dist %>/styleguide': '<%%= config.src %>/scss/**/*.scss'
	                }
	            ]
	        }
	    },
		<% } %>
		concurrent: {
	        rendering: {
	            tasks: [<% if(installAssemble === true){ %>
					'newer:assemble',<% } %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>
					'packager'<% } %><%}); %><%} %><%} %>
					
				],
	            options: {
	                logConcurrentOutput: true
	            }
	        },
			syncing: {
				tasks: [
					'sync:js', 
					'sync:assets'
				],
	            options: {
	                logConcurrentOutput: true
	            }
			},
			build: {
				tasks: [<% if(installAssemble === true){ %>
					'assemble',<% } %><% if(installDocs === true){ %>
					'copy',
					'styleguide',<% } %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-photobox') { %>
					'photoProd',<% } %><%}); %><%} %><%} %>	
					'prettyscss'
				],
	            options: {
	                logConcurrentOutput: true
	            }
			}
	    },
		
	    watch: {<% if(installAssemble === true){ %>
			assemble: {
				files: ['<%%= config.src %>/{data,templates/layouts,templates/partials}/**/{,*/}*.{js,md,hbs,yml,json}'],
				tasks: ['assemble']
			},
			pages: {
				files: ['<%%= config.src %>/templates/pages/**/{,*/}*.{js,md,hbs,yml,json}'],
				tasks: ['newer:assemble']
			},<% } %>
			js: {
				files: '<%%= config.src %>/js/{,*/}*.js',
				tasks: 'sync:js'
			},
			assets: {
				files: '<%%= config.src %>/assets/**/*',
				tasks: 'sync:assets'
			},
			livereload: {
				options: {
				livereload: '<%%= connect.options.livereload %>'
				},
				files: [
				  '<%%= config.dist %>/{,*/}*.html',
				  '<%%= config.dist %>/css/{,*/}*.css', // if you want to use browser-sync for css just comment out this line
				  '<%%= config.dist %>/js/{,*/}*.js',
				  '<%%= config.dist %>/assets/**/*'
				]
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
			options: {
	            flatten: true,
	            assets: '<%%= config.dist %>',
	            data: '<%%= config.src %>/data/*.{json,yml}',
	            helpers: '<%%= config.src %>/helpers/*.js',
	            partials: '<%%= config.src %>/templates/partials/**/*.hbs'
	        },
			pages: {
				options: {
					layout: '<%%= config.src %>/templates/layouts/tpl_default.hbs'<% if(plugin && plugin.length > 0){ %>,
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
			},
			ajax: {
	            options: {
	                layout: '<%%= config.src %>/templates/layouts/tpl_ajax.hbs'
	            },
	            files: {
					'<%%= config.dist %>/ajax-content/': ['<%%= config.src %>/templates/pages/ajax/*.hbs']
	            }
	        }
	    },
		<% } %>
		// Before generating any new files,
	    // remove any previously-created files.
	    clean: [<% if(installAssemble === true){ %>
			'<%%= config.dist %>/**/*.{html,xml,txt}',<% } %><% if(installDocs === true){ %>
			'<%%= config.dist %>/styleguide/**/*',<% } %>
			'<%%= config.dist %>/css/**/*',
			'<%%= config.dist %>/js/**/*',
			'<%%= config.dist %>/img/**/*'
		]
	  });

	  // Load Tasks
	  <% if(installAssemble === true){ %>
	  grunt.loadNpmTasks('assemble'); <% } %><% if(installDocs === true){ %>
	  grunt.loadNpmTasks('grunt-contrib-copy');
	  grunt.loadNpmTasks('grunt-styleguide');<% } %>
	  grunt.loadNpmTasks('grunt-newer');
	  grunt.loadNpmTasks('grunt-htmlhint');
	  grunt.loadNpmTasks('grunt-prettysass');
	  grunt.loadNpmTasks('grunt-bg-shell');
	  grunt.loadNpmTasks('grunt-sync');
	  grunt.loadNpmTasks('grunt-contrib-clean');
	  grunt.loadNpmTasks('grunt-contrib-connect');
	  grunt.loadNpmTasks('grunt-concurrent');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { %>
		  <% if(name == 'grunt-combine-media-queries') { %>
	grunt.loadNpmTasks('grunt-combine-media-queries'); 
	grunt.loadNpmTasks('grunt-contrib-cssmin'); <% } else { %>
	grunt.loadNpmTasks('<%= name %>'); <%} }); %><%} %><%} %>	  
	  
	 // Simple Tasks
	 <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { 
		if(name == 'grunt-grunticon') { %>
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
	    'watchCSS',
	    'connect:livereload', <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-browser-sync') { %>
		'browser_sync', <% } %><%}); %><%} %><%} %>
	    'watch'
	  ]);

	  grunt.registerTask('build', [
	    'clean',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>
		'js',<% } %><%}); %><%} %><%} %>
		'concurrent:syncing',
	    'cssProd',<% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-combine-media-queries') { %>
		'cmq',
		'cssmin', <% } %><%}); %><%} %><%} %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-bless') { %>
		'bless', <% } %><%}); %><%} %><%} %>
		'concurrent:build'
	  ]);

	  grunt.registerTask('default', [
	    'build'
	  ]);

	};
