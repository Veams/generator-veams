module.exports = {
	options: {
		log: true
	},
	combineIt: {
		options: {
			beautify: false
		},
		src: '<%= paths.app %>/css/styles.css',
		dest: '<%= paths.app %>/css/styles.css'
	}
};