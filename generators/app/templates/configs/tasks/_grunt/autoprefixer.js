module.exports = {
	options: {
		// Task-specific options go here.
	},

	// prefix all files
	multiple_files: {
		expand: true,
		flatten: true,
		src: '<%= paths.dest %>/css/*.css', // -> src/css/file1.css, src/css/file2.css
		dest: '<%= paths.dest %>/css' // -> dest/css/file1.css, dest/css/file2.css
	}
};