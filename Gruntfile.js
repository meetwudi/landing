module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: {
            prepub: {
                options: {
                    sourceMap: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'prepub/css/<%= pkg.name %>.css.map'
                },
                files: {
                    'prepub/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
                }
            }
        },


        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        },


        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'prepub', src: ['**'], dest: 'build/'}
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('prepub:css', ['less:prepub']);
    grunt.registerTask('prepub', ['prepub:css']);

    grunt.registerTask('build:pre', ['copy:build']);
    grunt.registerTask('build:css', ['cssmin:build']);
    grunt.registerTask('build', ['build:pre', 'build:css']);

    grunt.registerTask('default', ['prepub', 'build'])
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};