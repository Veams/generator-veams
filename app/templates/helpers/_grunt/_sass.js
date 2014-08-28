module.exports = {
	options: {
		outputStyle: 'nested',
		sourceMap: true
	},
	dist: {
		files: {
			'<%%= paths.dev %>/css/styles.css': '<%%= paths.src %>/scss/styles.scss'
		}
	}<% if (features && features.length > 0 && features.indexOf('supportIE8') != -1) { %>,
	ie: {
		files: {
			'<%%= paths.dev %>/css/ie8.css': '<%%= paths.src %>/scss/ie8.scss'
		}
	}<% } %><% if (features && features.length > 0 && features.indexOf('installDocs') != -1) { %>,
	docs: {
		files: {
			'<%%= paths.dev %>/css/docs.css': '<%%= paths.src %>/scss/docs.scss'
		}
	}<% } %>
};