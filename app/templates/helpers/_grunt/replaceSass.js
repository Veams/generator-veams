module.exports = {
    url: {
        src: [ '<%= paths.src %>/scss/icons/_icons-fallback.scss'],             // source files array (supports minimatch)
        dest: '<%= paths.src %>/scss/icons/_icons-fallback.scss',               // destination directory or file
        replacements: [
            {
                from: '../../assets/img/',                                      // string replacement
                to: '../img/'
            }
        ]
    }
}