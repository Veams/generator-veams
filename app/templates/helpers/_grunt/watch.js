module.exports = { <% if(installAssemble){ %>
    assemble: {
        files: ['<%%= paths.src %>/{data,templates/layouts,templates/partials}/**/{,*/}*.{js,md,hbs,yml,json}'],
        tasks: ['assemble']
    },
    pages: {
        files: ['<%%= paths.src %>/templates/pages/**/{,*/}*.{js,md,hbs,yml,json}'],
        tasks: ['newer:assemble']
    }, <% } %><% if(sassInsteadOfCompass == true){ %>
    scss: {
        files: '<%%= paths.src %>/scss/**/*',
        tasks: 'sass:dist'
    }, <% } %>
    js: {
        files: '<%%= paths.src %>/js/{,*/}*.js',
        tasks: 'sync:js'
    },
    assets: {
        files: '<%%= paths.src %>/assets/**/*',
        tasks: 'sync:assets'
    },
    livereload: {
        options: {
            livereload: '<%%= connect.options.livereload %>'
        },
        files: [
            '<%%= paths.dist %>/{,*/}*.html',
            '<%%= paths.dist %>/css/{,*/}*.css', // if you want to use browser-sync for css just comment out this line
            '<%%= paths.dist %>/js/{,*/}*.js',
            '<%%= paths.dist %>/assets/**/*'
        ]
    }
};