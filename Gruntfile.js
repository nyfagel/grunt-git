/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/*.js',
                'test/fixtures/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        mochacli: {
            options: {
                files: 'test/*_test.js'
            },
            spec: {
                options: {
                    reporter: 'spec',
                    timeout: 10000
                }
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-release');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'mochacli']);

    // Test before releasing.
    grunt.registerTask('package', ['test', 'release']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
