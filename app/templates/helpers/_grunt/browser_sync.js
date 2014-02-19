module.exports = {
    files: {
        src: [
            '<%= paths.dist %>/css/styles.css',
            '<%= paths.dist %>/img/**/*.{jpg,png,gif}',
            '<%= paths.dist %>/media/**/*.{jpg,png,gif}',
            '<%= paths.dist %>/js/**/*.js',
            '<%= paths.dist %>/**/*.html'
        ]
    },
    options: {
        host: "localhost",
        server: {
            baseDir: '<%= paths.dist %>'
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