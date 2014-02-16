module.exports = {
    styleguide: {
        dest: '<%= paths.dist %>/styleguide/css/',
        expand: true,
        filter: 'isFile',
        flatten: true,
        src: ['<%= paths.dist %>/css/**/*.css']
    }
};