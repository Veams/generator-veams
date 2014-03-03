module.exports = {
    dist: {
        options: {
            outputStyle: 'nested',
            sourcemap: true
        },
        files: {
            '<%= paths.dist %>/css/styles.css': '<%= paths.src %>/scss/styles.scss',
            '<%= paths.dist %>/css/ie8.css': '<%= paths.src %>/scss/ie8.scss'
        }
    }
}