module.exports = {
    options: {
        log: true
    },
    cmqDist: {
        files: {
            '<%= paths.dist %>/css/': ['<%= paths.dist %>/css/{,*/}*.css']
        }
    }
};