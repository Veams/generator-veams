const fs = require('fs-extra');
const babelrc = JSON.parse(fs.readFileSync(`${process.cwd()}/.babelrc`, 'utf-8'));

module.exports = function () {
	return {
		test: /\.jsx?$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		options: {
			// This is a feature of `babel-loader` for webpack (not Babel itself).
			// It enables caching results in ./node_modules/.cache/babel-loader/
			// directory for faster rebuilds.
			cacheDirectory: true,
			// Let's add babel presets ...
			presets: babelrc.env.client.presets,
			// ... and plugins.
			plugins: babelrc.env.client.plugins
		}
	}
};
