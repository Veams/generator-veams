const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (configContext) {
	return [
		new StyleLintPlugin({
			configFile: `${configContext}/tasks/linting/stylelint.config.js`,
			files: [
				'**/*.s?(a|c)ss'
			]
		}),
		new ExtractTextPlugin({
			filename: '/css/[name].bundle.css'
		})
	]
};