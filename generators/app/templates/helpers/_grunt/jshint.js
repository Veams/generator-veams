module.exports = {
    options: {
        force: true,
        'asi': false,
        'bitwise': false,
        'boss': true,
        'curly': false,
        'eqeqeq': false,
        'eqnull': true,
        'evil': false,
        'forin': true,
        'immed': false,
        'laxbreak': true,
        'newcap': false,
        'noarg': true,
        'noempty': false,
        'nonew': false,
        'nomen': false,
        'onevar': false,
        'plusplus': false,
        'regexp': false,
        'undef': false,
        'sub': true,
        'strict': false,
        'white': false,
        'indent': 4,
        'maxerr': 50,
        'jquery': true,
        'browser': true
    },
    all: [
        'Gruntfile.js',<% if(modules && modules.length > 0){ if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>
        '<%%= paths.src %>/js/init/*.js'<% }}); }} %>
    ]
}