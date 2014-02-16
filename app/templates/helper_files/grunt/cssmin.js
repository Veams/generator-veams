module.exports = {
    options: {
        processImport: false
    },
    minify: {
        expand: true,
        cwd: '<%= paths.dist %>/css/',
        src: ['*.css'],
        dest: '<%= paths.dist %>/css/'
    }
};