module.exports = {
    options: {
        port: '<%= ports.app %>',
        livereload: '<%= ports.livereload %>',
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
    },
    livereload: {
        options: {
            open: true,
            base: [
                '<%= paths.dist %>'
            ]
        }
    }
};