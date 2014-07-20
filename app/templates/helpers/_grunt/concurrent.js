module.exports = {
    syncing: {
        tasks: [
            'sync'
        ],
        options: {
            logConcurrentOutput: true
        }
    },
    build: {
        tasks: [<% if(installAssemble != false){ %>
            'assemble',<% } %><% if (features && features.length > 0) { if (features.indexOf('installDocs') != -1) { %>
            'copy',
            'styleguide',<% }} %>
            'beauty-scss'
        ],
        options: {
            logConcurrentOutput: true,
            limit: 5
        }
	}
};