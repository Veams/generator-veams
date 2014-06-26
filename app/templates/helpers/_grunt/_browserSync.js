module.exports = {
	bsFiles: {
		src: [
			'<%%= paths.dist %>/css/styles.css', <% if (features && features.length > 0 && features.indexOf('installDocs') != -1) { %>
			'<%%= paths.dist %>/css/docs.css', <% } %>
			'<%%= paths.dist %>/img/**/*.{jpg,png,gif}',
			'<%%= paths.dist %>/media/**/*.{jpg,png,gif}',
			'<%%= paths.dist %>/js/**/*.js',
			'<%%= paths.dist %>/**/*.html'
		]
	},
	options: {
		host: "localhost",
		server: {
			baseDir: '<%%= paths.dist %>',
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