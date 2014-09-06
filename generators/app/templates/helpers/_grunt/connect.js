module.exports = {
    options: {
        port: '<%%= ports.app %>',
        livereload: '<%%= ports.livereload %>',
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
    },
    livereload: {
        options: {
            open: true,
            base: [
                '<%%= paths.dev %>'
            ]
        }
    }<% if(modules && modules.length > 0 && modules.indexOf('grunt-connect-proxy') !== -1 && proxyHost && proxyPort) { %>,
    'proxy': {
        options: {
            hostname: '0.0.0.0',
            port: 8000,
            middleware: function(connect, options, next) {
                var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
                var proxySnippetWithHeader = function (req, res, next) {
                    // allow CORS for dev proxy
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD');
                    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

                    return proxySnippet(req, res, next);
                };
                return [proxySnippetWithHeader];
            }
        },
        proxies: [
        {
            context: '/',
            host: '<%= proxyHost %>',
            port: <%= proxyPort %>
            // https: true,
            // headers: {
            //  // example config for basic authentification
            //  'Authorization': 'Basic YmFua19vZl9zY290X2VsYnJpbms6VGVzdC1hcGVydG8yMDEz',
            //  'Accept': 'application/json',
            //  'Access-Control-Allow-Origin': '127.0.0.1:9001'
            // }         
        }]
    }<% } %>
};