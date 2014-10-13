/**
 * Created by Sebastian on 12.10.2014.
 */

module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		copy: {
			components: {
				files: [
					{
						cwd: 'frontend-modules/resources/templates/partials/components/',
						expand: true,
						flatten: false,
						src: ['**/*.{hbs,md}'],
						dest: 'components'
					}
				]
			},
			modules: {
				files: [
					{
						cwd: 'frontend-modules/resources/templates/partials/modules',
						expand: true,
						flatten: false,
						src: ['**/*.{hbs,md}'],
						dest: 'modules'
					}
				]
			},
			scss: {
				files: [
					{
						cwd: 'frontend-modules/resources/scss/',
						expand: true,
						flatten: false,
						src: [
							'components/_c-form.scss',
							'modules/_m-carousel.scss'
						],
						dest: 'scss'
					}
				]
			},
			js: {
				files: [
					{
						cwd: 'frontend-modules/resources/js/',
						expand: true,
						flatten: false,
						src: [
							'backbone/**/*.js',
							'jquery/modules/**/*.js'
						],
						dest: 'js'
					}
				]
			},
			data: {
				files: [
					{
						cwd: 'frontend-modules/resources/data/',
						expand: true,
						flatten: false,
						src: [
							'carousels/**/*.json',
							'pages/forms/**/*.json'
						],
						dest: 'data'
					}
				]
			},
			pages: {
				files: [
					{
						cwd: 'frontend-modules/resources/templates/pages',
						expand: true,
						flatten: false,
						src: [
							'forms/**/*.hbs',
							'backbone/**/*.hbs',
							'jquery/**/*.hbs'
						],
						dest: 'pages'
					}
				]
			}
		}
	});

// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-copy');

// Whenever the "test" task is run, first clean the "tmp" dir, then run this
// plugin's task(s), then test the result.
	grunt.registerTask('dist', ['copy']);

// By default, lint and run all tests.
	grunt.registerTask('default', ['dist']);
};