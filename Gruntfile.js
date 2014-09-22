var cdnAddr = '//cdn.leapoahead.com/';


module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: {
            src: {
                options: {
                    sourceMap: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'public/src/css/<%= pkg.name %>.css.map'
                },
                files: {
                    'public/src/css/<%= pkg.name %>.css': 'public/less/<%= pkg.name %>.less'
                }
            }
        },


        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['public/*.css', '!*.min.css'],
                    dest: 'public/build/css'
                }]
            }
        },


        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'public/src', src: ['**'], dest: 'public/build/'}
                ]
            }
        },


        sprite: {
            icon: {
                src: ['public/img/icon/*.png'],
                destImg: 'public/src/img/icon/icon.png',
                destCSS: 'public/less/mixins/sprites/icon/icon.less',
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
                src: ['public/img/icon-2x/*.png'],
                destImg: 'public/src/img/icon/icon-2x.png',
                destCSS: 'public/less/mixins/sprites/icon/icon-2x.less',
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
            files: ['public/less/**/*.less', 'public/src/*.html'],
            tasks: ['src'],
            options: {
                livereload: true
            }
        },


        rm: {
          buildDir: {
              dir: 'public/build'
          }
        },


        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            css: {
                src: ['public/build/css/**/*.css']
            },
            images: {
                src: ['public/build/img/**/*.{png,jpg}']
            }
        },


        useminPrepare: {
            html: ['public/build/index.html']
        },


        usemin: {
            html: ['public/build/index.html'],
            css: ['public/build/css/*.css']
        },


        imagemin: {
            bigimage: {
                files: {
                    'public/src/img/background.jpg': 'public/img/background.jpg'
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
                        if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
                            return url;
                        }
                        if (url.indexOf('../img') === 0) {
                            url = url.replace('../img', '/img');
                        }
                        return cdnAddr + url.replace(/^\//, '');
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'public/build',
                    src: '**/*.{css,html}',
                    dest: 'public/build'
                }]
            }
        },




        concat: {
            scripts: {
                src: ['public/components/seajs/dist/sea.js',
                    'public/components/seajs-combo/dist/seajs-combo.js'],
                dest: 'public/src/js/seed.js'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // 预发布（src）
    grunt.registerTask('src:image', ['sprite', 'imagemin']);
    grunt.registerTask('src:css', ['less:src']);
    grunt.registerTask('src:scripts', ['concat:scripts']);
    grunt.registerTask('src', ['src:css', 'src:scripts']);

    // build环境
    grunt.registerTask('build:pre', ['rm', 'copy:build']);
    grunt.registerTask('build:opt', ['useminPrepare', 'cssmin:build', 'filerev', 'usemin', 'cdnify']);
    grunt.registerTask('build', ['build:pre', 'build:opt']);

    grunt.registerTask('default', ['src', 'build']);
//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};