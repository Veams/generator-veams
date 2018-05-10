'use strict';

const config = require('../../../veams-cli');

module.exports = {
	options: {
		allow: {
			YFMContextData: true,
			YFMLayout: true
		},
		collections: [
			'sitemap',
			'type'
		],
		cwd: config.paths.src,
		dest: config.paths.dest,
		exportData: false,
		flatten: true,
		types: {
			data: {
				dir: '',
				files: [
					'app/core/**/*.hjson',
					'app/core/**/*.json',
					// 'app/features/**/*.hjson',
					// 'app/features/**/*.json',
					'app/shared/components/**/*.hjson',
					'app/shared/components/**/*.json',
					'app/shared/utilities/**/*.hjson',
					'app/shared/utilities/**/*.json'
				]
			},
			partials: {
				dir: '',
				files: [
					'app/shared/components/**/*.hbs',
					'app/core/components/**/*.hbs',
					// 'app/features/**/*.hbs',
					'app/shared/utilities/**/*.hbs'
				]
			},
			pages: {
				dir: '',
				files: [
					'app/pages/**/*.hbs',
					'app/shared/components/**/*.hbs',
					// 'app/features/**/*.hbs',
					'app/shared/utilities/**/*.hbs'
				]
			},
			layouts: {
				dir: '',
				files: [
					'app/core/layouts/**/*.hbs',
					'docs/layouts/**/*.hbs'
				]
			}
		},
		helpers: [
			'app/shared/utilities/template-helpers/*.js'
		]
	},
	dev: {
		options: {
			compileStaticFiles: false,
			devServer: {
				start: true,
				injectScript: false,
				useExt: true,
				port: config.ports.server,
				bsOptions: {
					proxy: 'localhost:' + config.ports.server,
					port: config.ports.app,
					files: [
						config.paths.dest + '/**/*.html',
						config.paths.dest + '/css/**/*.css',
						config.paths.dest + '/scripts/**/*.js'
					]
				}
			},
			watch: true
		}
	},
	dist: {
		options: {
			compileStaticFiles: true,
			watch: false
		}
	}
};