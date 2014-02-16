module.exports = {
    options: {
        alphabetize: false,
        indent: "t"
    },
    scss: {
        src: [
            '<%= paths.src %>/scss/drupal/**/*.scss',
            '<%= paths.src %>/scss/global/**/*.scss',
            '<%= paths.src %>/scss/icons/**/*.scss',
            '<%= paths.src %>/scss/modules/**/*.scss',
            '<%= paths.src %>/scss/utils/**/*.scss'
        ]
    }
};