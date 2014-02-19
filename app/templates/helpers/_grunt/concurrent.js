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
                'sync:js',
                'sync:assets'
            ],
            options: {
                logConcurrentOutput: true
            }
        },
        build: {
            tasks: [<% if(installAssemble){ %>
                'assemble',<% } %><% if(installDocs){ %>
                'copy',
                'styleguide',
                'prettyscss'
            ],
            options: {
                logConcurrentOutput: true,
                limit: 5
            }
		}
};