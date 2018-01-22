module.exports = {
	options: {
		log: true
	},
	combineIt: {
		options: {
			beautify: false
		},
		src: '<%= paths.app %>/css/app.bundle.css',
		dest: '<%= paths.app %>/css/app.bundle.css'
	}
};