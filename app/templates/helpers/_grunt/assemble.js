module.exports = {
    options: {
        flatten: true,
        assets: '<%%= paths.dist %>',
        data: '<%%= paths.src %>/data/*.{json,yml}',
        helpers: '<%%= paths.src %>/templates/helpers/*.js',
        layoutdir: '<%%= paths.src %>/templates/layouts/',
        partials: '<%%= paths.src %>/templates/partials/**/*.hbs'
    },
    pages: {
        options: {
            layout: 'tpl_default.hbs'<% if(plugin && plugin.length > 0){ %>,
    plugins: [<% if(typeof plugin === 'object'){ _.each(plugin, function(name, i) { %>'<%= name %>'<% if(i < (plugin.length - 1)) { %>,<% } }); } else { %>'<%= name %>'<%} %>],<%}
    _.each(plugin, function(name, i) { if(name == 'permalinks') { %>
        permalinks: {
        preset: 'pretty'
        },<% }
        if(name == 'assemble-contrib-contextual') { %>
            contextual: {
                dest: 'tmp/'
            },<% }
          }); %>
         },
            files: {
                '<%%= paths.dist %>/': ['<%%= paths.src %>/templates/pages/*.hbs']
                }
            },
            ajax: {
                options: {
                    layout: 'tpl_ajax.hbs'
                },
            files: {
                    '<%%= paths.dist %>/ajax-content/': ['<%%= paths.src %>/templates/pages/ajax/*.hbs']
                }
            }
};