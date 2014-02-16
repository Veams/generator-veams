module.exports = {
    options: {
        template: {
            src: '<%= paths.helper %>/styleguide-template/'
        },
        name: 'Style Guide',
        framework: {
            name: 'kss'
        }
    },
    all: {
        files: [
            {
                '<%= paths.dist %>/styleguide': '<%= paths.src %>/scss/**/*.scss'
            }
        ]
    }
};