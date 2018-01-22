const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const veamsConfig = require('../../../veams-cli.json');
const env = process.env.NODE_ENV;

/**
 * Directory Handling
 */
const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

/**
 * Generic Webpack Options
 */
const context = resolveAppPath(veamsConfig.paths.src);
const configContext = resolveAppPath(veamsConfig.paths.config);
const outputPath = resolveAppPath(veamsConfig.paths.app);
const envFile = resolveAppPath(veamsConfig.paths.env) + `/environment.${env}.js`;

/**
 * Rules
 */
const scriptRule = require('./rules/scripting');
const styleRule = require('./rules/styling');

/**
 * Plugins
 */
const scriptPlugins = require('./plugins/scripts.plugins');
const stylePlugins = require('./plugins/styles.plugins');

/**
 * Tasks
 */
module.exports = [
	{
		context,
		devtool: 'cheap-module-source-map',
		resolve: {
			alias: {
				'app.veams$': `${context}/app.veams.js`,
				'env': envFile
			}
		},
		// Entry point for webpack
		entry: {
			app: `${context}/app.js`
		},
		// Output directory and filename
		output: {
			filename: 'scripts/app.bundle.js',
			path: outputPath
		},
		// Tell webpack to run babel on every file it runs through
		module: {
			rules: [
				scriptRule()
			]
		},
		plugins: scriptPlugins(),
		// Some libraries import Node modules but don't use them in the browser.
		// Tell Webpack to provide empty mocks for them so importing them works.
		node: {
			dgram: 'empty',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
		},
		// Turn off performance hints during development because we don't do any
		// splitting or minification in interest of speed. These warnings become
		// cumbersome.
		performance: {
			hints: false
		}
	}, {
		context,
		devtool: 'cheap-module-source-map',
		// Entry point for webpack
		entry: {
			'app': `${context}/app.scss`,
		},
		output: {
			filename: 'css/[name].css',
			path: outputPath
		},
		module: {
			rules: [
				styleRule()
			]
		},
		plugins: stylePlugins(configContext),
		// Turn off performance hints during development because we don't do any
		// splitting or minification in interest of speed. These warnings become
		// cumbersome.
		performance: {
			hints: false
		}
	}, {
		context,
		devtool: 'cheap-module-source-map',
		// Entry point for webpack
		entry: {
			'docs': `${context}/core/layouts/docs/docs.scss`
		},
		output: {
			filename: 'css/docs.css',
			path: outputPath
		},
		module: {
			rules: [
				styleRule()
			]
		},
		plugins: stylePlugins(configContext),
		// Turn off performance hints during development because we don't do any
		// splitting or minification in interest of speed. These warnings become
		// cumbersome.
		performance: {
			hints: false
		}
	}
];