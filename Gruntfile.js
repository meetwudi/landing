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
                    dest: 'build/css'
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
                destCSS: 'less/mixins/sprites/icon/icon.less',
                padding: 2,
                cssFormat: 'less',
                imgPath: '../img/icon/icon.png',
                cssVarMap: function (sprite) {
                    // `sprite` has `name`, `image` (full path), `x`, `y`
                    //   `width`, `height`, `total_width`, `total_height`
                    // EXAMPLE: Prefix all sprite names with 'sprite-'
                    sprite.name = 'sprite-' + sprite.name;
                }
            },
            icon_2x: {
                src: ['img/icon-2x/*.png'],
                destImg: 'src/img/icon/icon-2x.png',
                destCSS: 'less/mixins/sprites/icon/icon-2x.less',
                padding: 2,
                cssFormat: 'less',
                imgPath: '../img/icon/icon-2x.png',
                cssVarMap: function (sprite) {
                    // `sprite` has `name`, `image` (full path), `x`, `y`
                    //   `width`, `height`, `total_width`, `total_height`
                    // EXAMPLE: Prefix all sprite names with 'sprite-'
                    sprite.name = 'sprite-' + sprite.name;
                }
            }
        },


        watch: {
            files: ['less/**/*.less', 'src/*.html'],
            tasks: ['src'],
            options: {
                livereload: true
            }
        },


        rm: {
          buildDir: {
              dir: 'build'
          }
        },


        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        'build/css/**/*.css',
                        'build/img/**/*.{jpg,png}'
                    ]
                }]
            }
        },


        useminPrepare: {
            html: ['build/index.html']
        },

        usemin: {
            html: ['build/index.html']
        }
    });

    require('load-grunt-tasks')(grunt);

    // 预发布
    grunt.registerTask('src:sprite', ['sprite']);
    grunt.registerTask('src:css', ['less:src']);
    grunt.registerTask('src', ['src:css']);

    // 发布环境
    grunt.registerTask('build:pre', ['rm', 'copy:build']);
    grunt.registerTask('build:opt', ['useminPrepare', 'cssmin:build', 'rev', 'usemin']);
    grunt.registerTask('build', ['build:pre', 'build:opt']);

    grunt.registerTask('default', ['src', 'build'])
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};