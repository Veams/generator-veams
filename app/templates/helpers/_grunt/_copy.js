module.exports = { <% if (features && features.length > 0) { %><% if (features.indexOf('installDocs') != -1) { %>
	styleguide: {
		dest: '<%%= paths.dev %>/styleguide/css/',
		expand: true,
		filter: 'isFile',
		flatten: true,
		src: ['<%%= paths.dev %>/css/**/*.css']
	}<% } %><% if (features.indexOf('createDevFolder') != -1 && features.indexOf('installDocs') != -1) { %>,<% } %><% if (features.indexOf('createDevFolder') != -1){ %>
	dist: {
		cwd: '<%%= paths.dev %>/',
		dest: '<%%= paths.dist %>',
		expand: true,
		src: ['**']
	}<% } %>
	<% } %>
};