module.exports = {
    rendering: {
        tasks: [<% if(installAssemble){ %>
            'newer:assemble',<% } %><% if(modules && modules.length > 0){ %><% if(typeof modules === 'object'){ _.each(modules, function(name, i) { if(name == 'grunt-packager') { %>
            'packager'<% } %><%}); %><%} %><%} %>

        ],
        options: {
            logConcurrentOutput: true
            }
        },
        syncing: {
            tasks: [
                'sync'
            ],
            options: {
                logConcurrentOutput: true
            }
        },
        build: {
            tasks: [<% if(installAssemble){ %>
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