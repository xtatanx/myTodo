module.exports = function(grunt) {

	// PLUGINS LOADED
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-targethtml');
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

      buildDev:{
        files: ['*.html', 'css/*.css', 'js/*.js', 'img/*'],
        tasks: ['buildDev'],
        options: {
          debounceDelay: 5000
        }     
      },

			livereload: {
				options:{
					livereload: true
				},

				files:['*.html', 'css/*.css', 'js/*.js', 'img/*']
			}

		},

    copy:{
      development:{
        src: [
        '**', 
        '!css/*.styl',
        '!Gruntfile.js',
        '!production/**',
        '!development/**',
        '!package.json',
        '!bower.json',
        '!firebase.json',
        '!node_modules/**',
        '!**.md',
        '!LICENSE',
        '!bower_components/**',
        'js/**.js',
        'css/**.css',
        '!css/to-doit.min.css',
        '!js/to-doit.min.js'        
        ],
        dest: 'development/'
      },

      production:{
        src: [
        '**', 
        '!css/*.styl',
        '!Gruntfile.js',
        '!production/**',
        '!development/**',
        '!package.json',
        '!bower.json',
        '!firebase.json',
        '!node_modules/**',
        '!**.md',
        '!LICENSE',
        '!bower_components/**',
        '!js/**.js',
        '!css/**.css',
        'css/to-doit.min.css',
        'js/to-doit.min.js'
        ],
        dest: 'production/'
      }      
    },

    clean:{
      development:[
        'development/**'
      ],

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
        dest: 'js/to-doit.js'
      },

      css:{
        src: [
          'css/normalize.min.css',
          'css/main.css'
        ],
        dest:'css/to-doit.css'
      }
    },

    cssmin:{
      minify:{
        src: 'css/to-doit.css',
        dest: 'css/to-doit.min.css'
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
          'js/to-doit.min.js': ['js/to-doit.js']
        }
      }
    },

    targethtml:{
      development:{
        files:{
          'development/index.html': 'index.html'
        }
      },

      production:{
        files:{
          'production/index.html': 'index.html'  
        }
      }
    }

	});

	// MY TASKS
	grunt.registerTask('observer','watch');
	grunt.registerTask('preproccess', ['stylus', 'autoprefixer']);
  grunt.registerTask('buildDev', ['concat', 'cssmin', 'uglify', 'clean:development', 'copy:development', 'targethtml:development']);
  grunt.registerTask('buildProd', ['concat', 'cssmin', 'uglify', 'clean:production', 'copy:production', 'targethtml:production']);
};