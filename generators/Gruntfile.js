/**
 * Created by Sebastian on 12.10.2014.
 */

module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

			single: {
				files: [
					{src: ['test/fixtures/test.js'], dest: 'tmp/single.js'}
				]
			}
		}
	);

// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-copy');

// Whenever the "test" task is run, first clean the "tmp" dir, then run this
// plugin's task(s), then test the result.
	grunt.registerTask('dist', ['copy']);

// By default, lint and run all tests.
	grunt.registerTask('default', ['dist']);
};