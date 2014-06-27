module.exports = {
	options: {
		outputStyle: 'nested',
		sourceMap: true
	},
	dist: {
		files: {
			'<%%= paths.dist %>/css/styles.css': '<%%= paths.src %>/scss/styles.scss'
		}
	},
	ie: {
		files: {
			'<%%= paths.dist %>/css/ie8.css': '<%%= paths.src %>/scss/ie8.scss'
		}
	}<% if (features && features.length > 0 && features.indexOf('installDocs') != -1) { %>,
	docs: {
		files: {
			'<%%= paths.dist %>/css/docs.css': '<%%= paths.src %>/scss/docs.scss'
		}
	}<% } %>
}