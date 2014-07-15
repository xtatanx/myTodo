//  This basic grunt template can matach in every project with some tweaks
//  Jhonnatan Gonzalez - 2014

module.exports = function(grunt) {

	// PLUGINS LOADED
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-jslint');

	// PROJECT CONFIGURATION
	grunt.initConfig({
		stylus:{
			compile:{
				files:{
					"css/main.css": "css/main.styl"
				}				
			}
		},

		autoprefixer:{
			main_file:{
				src: "css/main.css"
			}
		},

		watch:{
			stylesheets:{
				files: ['css/*.styl'],
				tasks:['preproccess']
			},

      jsfiles:{
        files: ['js/*.js'],
        tasks: ['jslint']
      },

			livereload: {
				options:{
					livereload: true
				},

				files:['*.html', 'css/*.css', 'js/*.js', 'img/*']
			}

		},

    copy:{
      production:{
        src: [
          'css/',
          'img/',
          'js/*/*.js',
          'fonts/*'
        ],
        dest: 'production/'
      }      
    },

    clean:{
      production:[
        'production/**'
      ]
    },

    concat:{
      js:{
        src:[
          'js/authClient.js',
          'js/models.js',
          'js/collections.js',
          'js/views.js',
          'js/router.js',
          'js/app.js'
        ],
        dest: 'production/js/to-doit.min.js'
      },

      css:{
        src: [
          'css/normalize.min.css',
          'css/main.css'
        ],
        dest:'production/css/to-doit.min.css'
      }
    },

    cssmin:{
      minify:{
        src: 'production/css/to-doit.min.css',
        dest: 'production/css/to-doit.min.css'
      }  
    },

    uglify:{
      options:{
        compress:{
          drop_console: true
        },
        mangle:{
          except: ['jQuery', 'Backbone']
        }
      },
      my_target:{
        files:{
          'production/js/to-doit.min.js': ['production/js/to-doit.min.js']
        }
      }
    },

    targethtml:{
      production:{
        files:{
          'production/index.html': 'index.html'  
        }
      }
    },

    htmlmin:{
      production:{
        options:{
          removeComments: true,
          collapseWhitespace: true
        },
        files:{
          'production/index.html': 'production/index.html'
        }
      }
    },

    imagemin:{
      production: {
        options:{
          optimizationLevel: 0
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['*.{png,jpg,gif}'],
          dest: 'production/img/'
        }]
      }
    },

    jslint:{
      production:{
        src: 'js/*.js',

        directives:{
            browser:true,
            nomen: true,
            predef:['jQuery', 'Backbone', 'Firebase', '$', 'FirebaseSimpleLogin', 'console', '_']
        }        
      }
    }

	});

	// MY TASKS
	grunt.registerTask('observer','watch');
	grunt.registerTask('preproccess', ['stylus', 'autoprefixer']);
  grunt.registerTask('build', ['clean:production', 'copy:production', 'concat', 'cssmin', 'uglify', 'targethtml:production', 'htmlmin', 'imagemin']);
};