module.exports = {
	bsFiles: {
		src: [
			'<%%= paths.dev %>/css/styles.css', <% if (features && features.length > 0 && features.indexOf('installDocs') != -1) { %>
			'<%%= paths.dev %>/css/docs.css', <% } %>
			'<%%= paths.dev %>/img/**/*.{jpg,png,gif}',
			'<%%= paths.dev %>/media/**/*.{jpg,png,gif}',
			'<%%= paths.dev %>/js/**/*.js',
			'<%%= paths.dev %>/**/*.html'
		]
	},
	options: {
		host: "localhost",
		server: {
			baseDir: '<%%= paths.dev %>',
			index: "index.html"
		},
		watchTask: true,
		ghostMode: {
			clicks: true,
			scroll: true,
			links: true,
			forms: true
		}
	}
};