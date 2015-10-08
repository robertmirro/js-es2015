module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            target: {
                src: 'app/index.html'
            }
        },
        tags: {
            build: {
                options: {
                    scriptTemplate: '<script type="text/javascript" src="{{ path }}"></script>',
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

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-script-link-tags');

    grunt.registerTask('build', [
        'wiredep',
        'tags'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};