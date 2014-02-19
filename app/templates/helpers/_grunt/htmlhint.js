module.exports = {
        all: {
            options: { // Want to know what configurations are available? http://htmlhint.com/
                htmlhintrc: '<%= paths.helper %>/.htmlhintrc'
            },
            src: ['<%= paths.dist %>/*.html']
        }
};