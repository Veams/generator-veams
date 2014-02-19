module.exports = {
    dist: [<% if(installAssemble){ %>
        '<%%= paths.dist %>/**/*.{html,xml,txt}',<% } %><% if(installDocs){ %>
		'<%%= paths.dist %>/styleguide/**/*',<% } %>
        '<%%= paths.dist %>/css/**/*',
        '<%%= paths.dist %>/js/**/*',
        '<%%= paths.dist %>/img/**/*'] <% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-grunticon') { %>,
	grunticon: [
        '<%%= paths.src %>/scss/icons/*.{html,js,txt}'
    ]<% } %><%}); %><%} %><%} %>
};