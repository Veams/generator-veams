/**
 * User: Sebastian Fitzner
 * Date: 13.03.14
 * Time: 22:15
 */
require.config({
    paths: {<% if(jsLibs && jsLibs.length > 0){ %><% if(typeof jsLibs === 'object'){ _.each(jsLibs, function(name, i) { %><% if(name == 'jquery') { %> 
		jquery: '../bower_components/jquery/dist/jquery'<% if(i < (jsLibs.length - 1)) { %>,<% } %><% } %><% if(name == 'backbone') { %>
        backbone: '../bower_components/backbone/backbone'<% if(i < (jsLibs.length - 1)) { %>,<% } %><% } %><% if(name == 'angular') { %>
        angular: '../bower_components/angular/angular'<% } %><% }); }  %><% } %>
    },
    shim: {<% if (jsLibs && jsLibs.length > 0) { if (jsLibs.indexOf('backbone') != -1) { %>
        'backbone': {
            deps: ['../bower_components/underscore/underscore', 'jquery'],
            exports: 'Backbone'
        }<% }} %>
    }
});
require([
		'app'<% if(jsLibs && jsLibs.length > 0){ %>,<% if(typeof jsLibs === 'object'){ _.each(jsLibs, function(name, i) { %><% if(name == 'jquery') { %> 
		'jquery'<% if(i < (jsLibs.length - 1)) { %>,<% } %><% } %><% if(name == 'backbone') { %>
        'backbone'<% if(i < (jsLibs.length - 1)) { %>,<% } %><% } %><% if(name == 'angular') { %>
        'angular'<% } %><% }); }  %><% } %>
	], function (
		app<% if(jsLibs && jsLibs.length > 0){ %>,<% if(typeof jsLibs === 'object'){ _.each(jsLibs, function(name, i) { %><% if(name == 'jquery') { %> 
		$<% if(i < (jsLibs.length - 1)) { %>,<% } %><% } %><% if(name == 'backbone') { %>
        backbone<% if(i < (jsLibs.length - 1)) { %>,<% } %><% } %><% if(name == 'angular') { %>
        angular<% } %><% }); }  %><% } %>
) {
    'use strict';
		console.log(app);<% if(jsLibs && jsLibs.length > 0){ %><% if(typeof jsLibs === 'object'){ _.each(jsLibs, function(name, i) { %><% if(name == 'jquery') { %> 
		console.log('Running jQuery %s', $().jquery);<% } %> <% if(name == 'backbone') { %>
		console.log(backbone);<% } %> <% if(name == 'angular') { %>
        console.log(angular);<% } %><% }); }  %><% } %>
});
