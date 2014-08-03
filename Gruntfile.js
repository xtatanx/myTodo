module.exports = function(grunt){

    grunt.initConfig({

        watch: {

            stylesheets: {
                files: ['public/stylus/*.styl'],
                tasks: ['stylus', 'autoprefixer'],
                options: {
                    spawn: false
                }
            },

            scripts: {
                files: ['public/javascripts/*.js'],
                tasks: ['jslint']
            },

            livereload: {
                options: {
                    livereload:true
                },
                files: ['public/**/*', 'views/*.ejs']
            }
        },

        stylus: {
            compile: {
                files: {
                    'public/stylesheets/main.css': 'public/stylus/main.styl'
                }
            }
        },

        jslint: {
            scripts: {
                src: ['public/javascripts/main.js'],
                directives: {
                    browser: true,
                    white: true,
                    devel: true,
                    predef: [
                        'jQuery',
                    ]
                }  
            }      
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },

            allFiles: {
                files: {
                    'public/stylesheets/main.css' : 'public/stylesheets/main.css'
                }
            }
        }

    });

    // Load grunt modules
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Register tasks

    grunt.registerTask('observer', ['watch']);

};
