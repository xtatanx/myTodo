module.exports = function(grunt) {

	// PLUGINS LOADED
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// PROJECT CONFIGURATION
	grunt.initConfig({
		stylus:{
			compile:{
				files:{
					"css/main.css": "css/main.styl"
				}				
			}
		},
		watch:{
			css:{
				files: "css/*.styl",
				tasks:["styles"],
			},
			livereload:{
				options:{
					livereload: 1337
				}, 
				files:["**/*.html","css/*.css","js/*.js"]
			}			
		}		
	});

	// MY TASKS
	grunt.registerTask('observer', ['watch']);
	grunt.registerTask('styles', ['stylus']);

};