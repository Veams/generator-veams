module.exports = {
	libsassGlobbing: {
		options: {
			format: function (list, options, dest) {
				// just the index value
				var i = 0;
				// empty array which get be filled with our sass imports
				var imports = [];

				// loop to go through the list array and build our pattern
				for (i; i < list.length; i++) {
					// single list element
					var listEl = list[i];
					// clean up our list element to get only the path and filename
					var listElName = listEl.replace(/_([^_]*)$/, ""+'$1').replace(/\.scss|\.sass/gi, "");
					// concatenate our cleaned up item with '@import ""' and add it to our imports array
					imports += '@import "' + listElName + '";\n';
				}

				// return the imports array
				return imports;
			}
		},
		files: [
			{
				// define your destination file
				dest: '<%%= paths.src %>/scss/_all.scss',
				// define your current workind directory in which are the sass files located
				cwd: '<%%= paths.src %>/scss/',
				// here you can build your styles.scss like you would do in styles.scss with sass-globbing
				src: [
					'global/_reset.scss',<% if (cssLibs && cssLibs.length > 0) { if (cssLibs.indexOf('foundation') != -1) { %>
					'../bower_components/foundation/scss/_foundation.scss',<% }} %><% if (cssLibs && cssLibs.length > 0) { if (cssLibs.indexOf('neat') != -1) { %>
					'../bower_components/bourbon/app/assets/stylesheets/_bourbon.scss',
					'../bower_components/neat/app/assets/stylesheets/_neat.scss',<% }} %><% if (cssLibs && cssLibs.length > 0) { if (cssLibs.indexOf('sass-bootstrap') != -1) { %>
					'../bower_components/sass-bootstrap/lib/_bootstrap.scss',<% }} %>
					'global/_vars.scss',
					'utils/**/*.scss',
					'global/_main.scss',
					'modules/**/*.scss',
					'icons/**/*.scss'
				]
			}
		]
	}
};