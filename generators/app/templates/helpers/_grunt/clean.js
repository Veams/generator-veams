module.exports = {
	dist: [
		'<%%= paths.dist %>/**'
	],
    dev: [<% if(installAssemble){ %>
        '<%%= paths.dev %>/**/*.{html,xml,txt}',<% } %><% if (features && features.length > 0) { if (features.indexOf('installDocs') != -1) { %>
		'<%%= paths.dev %>/styleguide/**/*',<% }} %>
        '<%%= paths.dev %>/css/**/*',
        '<%%= paths.dev %>/js/**/*',
        '<%%= paths.dev %>/img/**/*'] <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-grunticon') { %>,
	grunticon: [
        '<%%= paths.src %>/scss/icons/*.{html,js,txt}'
    ]<% } %><%}); %><%} %><%} %>
};