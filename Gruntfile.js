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
        },


        sprite: {
            icon: {
                src: ['img/icon/*.png'],
                destImg: 'prepub/img/icon/icon.png',
                destCSS: 'less/bootstrap/icon.less',
                padding: 2,
                cssFormat: 'less',
                imgPath: '../img/icon/icon.png'
            },
            icon_2x: {
                src: ['img/icon-2x/*.png'],
                destImg: 'prepub/img/icon/icon-2x.png',
                destCSS: 'less/bootstrap/icon-2x.less',
                padding: 2,
                cssFormat: 'less',
                imgPath: '../img/icon/icon-2x.png'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // 预发布
    grunt.registerTask('prepub:image', ['sprite']);
    grunt.registerTask('prepub:css', ['less:prepub']);
    grunt.registerTask('prepub', ['prepub:css']);

    // 发布环境
    grunt.registerTask('build:pre', ['copy:build']);
    grunt.registerTask('build:css', ['cssmin:build']);
    grunt.registerTask('build', ['build:pre', 'build:css']);

    grunt.registerTask('default', ['prepub', 'build'])
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};