var cdnAddr = '//cdn.leapoahead.com/';


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


        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            css: {
                src: ['build/css/**/*.css']
            },
            images: {
                src: ['build/img/**/*.{png,jpg}']
            }
        },


        useminPrepare: {
            html: ['build/index.html']
        },


        usemin: {
            html: ['build/index.html'],
            css: ['build/css/*.css']
        },


        imagemin: {
            bigimage: {
                files: {
                    'src/img/background.jpg': 'img/background.jpg'
                },
                options: {
                    optimizationLevel: 3
                }
            }
        },

        cdnify: {
            build: {
                options: {
                    rewriter: function (url) {
                        if (url.indexOf('../img') === 0) {
                            url = url.replace('../img', '/img');
                        }
                        return cdnAddr + url.replace(/^\//, '');
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: '**/*.{css,html}',
                    dest: 'build'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // 预发布（src）
    grunt.registerTask('src:image', ['sprite', 'imagemin']);
    grunt.registerTask('src:css', ['less:src']);
    grunt.registerTask('src', ['src:css']);

    // build环境
    grunt.registerTask('build:pre', ['rm', 'copy:build']);
    grunt.registerTask('build:opt', ['useminPrepare', 'cssmin:build', 'filerev', 'usemin', 'cdnify']);
    grunt.registerTask('build', ['build:pre', 'build:opt']);

    grunt.registerTask('default', ['src', 'build'])
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};