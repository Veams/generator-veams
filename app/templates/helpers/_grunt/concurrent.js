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
            'assemble'<% } %><% if (features && features.length > 0) { if (features.indexOf('installDocs') != -1) { %>,
            'copy:styleguide',
            'styleguide'<% }} %><% if (modules && modules.length > 0) { if (modules.indexOf('grunt-csscomb') != -1) { %>,
            'beauty-scss'<% }} %>
        ],
        options: {
            logConcurrentOutput: true,
            limit: 5
        }
	}
};