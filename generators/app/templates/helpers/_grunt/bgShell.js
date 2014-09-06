module.exports = {
    _defaults: {
        bg: true
    },

    watchCompass: {
        cmd: 'compass watch'
    },

    devCompass: {
        bg: false,
        cmd: 'compass watch'
    },

    prodCompass: {
        bg: false,
        cmd: 'compass compile -e production --force'
    }
};