module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: {
            src: {
                options: {
                    sourceMap: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'src/css/<%= pkg.name %>.css.map'
                },
                files: {
                    'src/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
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
                    {expand: true, cwd: 'src', src: ['**'], dest: 'build/'}
                ]
            }
        },


        sprite: {
            icon: {
                src: ['img/icon/*.png'],
                destImg: 'src/img/icon/icon.png',
                destCSS: 'less/bootstrap/icon.less',
                padding: 2,
                cssFormat: 'less',
                imgPath: '../img/icon/icon.png'
            },
            icon_2x: {
                src: ['img/icon-2x/*.png'],
                destImg: 'src/img/icon/icon-2x.png',
                destCSS: 'less/bootstrap/icon-2x.less',
                padding: 2,
                cssFormat: 'less',
                imgPath: '../img/icon/icon-2x.png'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // 预发布
    grunt.registerTask('src:image', ['sprite']);
    grunt.registerTask('src:css', ['less:src']);
    grunt.registerTask('src', ['src:css']);

    // 发布环境
    grunt.registerTask('build:pre', ['copy:build']);
    grunt.registerTask('build:css', ['cssmin:build']);
    grunt.registerTask('build', ['build:pre', 'build:css']);

    grunt.registerTask('default', ['src', 'build'])
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};