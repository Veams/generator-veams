module.exports = {
	dist: {
		options: {
			outputStyle: 'nested',
			sourceMap: true
		},
		files: {
			'<%%= paths.dist %>/css/styles.css': '<%%= paths.src %>/scss/styles.scss', <% if (features && features.length > 0 && features.indexOf('installDocs') != -1) { %>
			'<%%= paths.dist %>/css/docs.css': '<%%= paths.src %>/scss/docs.scss', <% } %>
			'<%%= paths.dist %>/css/ie8.css': '<%%= paths.src %>/scss/ie8.scss'
		}
	}
}