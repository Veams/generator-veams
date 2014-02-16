module.exports = {
    local: {
        options: {
            screenSizes: [ '600', '1000', '1200' ],
            urls: [
                'http://localhost:9000/index.html',
                'http://localhost:9000/subpage.html',
                'http://localhost:9000/sitemap.html'
            ]
        }
    },
    dev: {
        options: {
            screenSizes: [ '600', '1000', '1200' ],
            urls: [
                ''
            ]
        }
    },
    prod: {
        options: {
            screenSizes: [ '600', '1000', '1200' ],
            urls: [
            ]
        }
    }
};