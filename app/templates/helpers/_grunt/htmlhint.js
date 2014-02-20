module.exports = {
    all: {
        options: { // Want to know what configurations are available? http://htmlhint.com/
            // htmlhintrc: '<%= paths.helper %>/.htmlhintrc',
            force: true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'attr-value-not-empty': true,
            'doctype-first': true,
            'doctype-html5': true,
            'id-class-value': true,
            'id-unique': true,
            'img-alt-require': true,
            'spec-char-escape': true,
            'src-not-empty': true,
            'style-disabled': true,
            'tag-pair': true,
            'tag-self-close': true,
            'tagname-lowercase': true
        },
        src: ['<%= paths.dist %>/*.html']
    }
};