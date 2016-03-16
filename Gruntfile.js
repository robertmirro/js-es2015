module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            dist: 'dist'
        },
        clean: {
            dist: ['<%= dirs.dist %>']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: '<%= dirs.dist %>/app',
                    src: [
                        'index.html',
                        'scripts/**',
                        'styles/**',
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    dest: '<%= dirs.dist %>/app',
                    src: ['fonts/*.*']
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/fontawesome',
                    dest: '<%= dirs.dist %>/app',
                    src: ['fonts/*.*']
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: '<%= dirs.dist %>/app'
            }
        },
        usemin: {
            html: ['<%= dirs.dist %>/app/index.html']
        },
        wiredep: {
            build: {
                src: 'app/index.html',
                overrides: {
                    fontawesome: {
                        main: ['./css/font-awesome.css']
                    }
                }
            }
        },
        tags: {
            build: {
                options: {
                    scriptTemplate: '<script src="{{ path }}"></script>',
                    openTag: '<!-- script tags - start -->',
                    closeTag: '<!-- script tags - end -->'
                },
                src: [
                    'app/scripts/**/*.js',
                    '!app/scripts/highlight.pack.js'
                ],
                dest: 'app/index.html'
            },
        }
    });

    grunt.registerTask('build', [
        'wiredep',
        'tags'
    ]);

    grunt.registerTask('dist', [
        'build',
        'clean',
        'copy',
        'useminPrepare',
        //'concat:generated',
        //'uglify:generated',
        //'cssmin:generated',
        'concat',
        'uglify',
        'cssmin',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};