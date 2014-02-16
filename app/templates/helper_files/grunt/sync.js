module.exports = {
    js: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%= paths.src %>/js',
                src: '**/*',
                dest: '<%= paths.dist %>/js'
            }
        ]
    },
    assets: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%= paths.src %>/assets',
                src: '**/{,*/}*',
                dest: '<%= paths.dist %>'
            }
        ]
    }
};