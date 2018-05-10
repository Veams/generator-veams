module.exports = {
	options: {
		log: true
	},
	combineIt: {
		options: {
			beautify: false
		},
		src: '<%= paths.dest %>/css/app.bundle.css',
		dest: '<%= paths.dest %>/css/app.bundle.css'
	}
};