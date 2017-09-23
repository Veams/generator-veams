'use strict';

const config = require('../../veams-cli');

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
		cwd: config.paths.src + '/',
		dest: config.paths.app,
		exportData: false,
		flatten: true,
		types: {
			data: {
				dir: '',
				files: [
					'core/**/*.hjson',
					'core/**/*.json',
					'shared/components/**/*.hjson',
					'shared/components/**/*.json',
					'shared/utilities/**/*.hjson',
					'shared/utilities/**/*.json'
				]
			},
			partials: {
				dir: '',
				files: [
					'shared/components/**/*.hbs',
					'shared/utilities/**/*.hbs'
				]
			},
			pages: {
				dir: '',
				files: [
					'pages/**/*.hbs',
					'shared/components/**/*.hbs',
					'shared/utilities/**/*.hbs'
				]
			},
			layouts: {
				dir: 'shared/layouts',
				files: [
					'**/*.hbs'
				]
			}
		},
		helpers: [
			'shared/utilities/template-helpers/*.js'
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
						config.paths.app + '/**/*.html',
						config.paths.app + '/css/**/*.css',
						config.paths.app + '/scripts/**/*.js'
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