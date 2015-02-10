module.exports = {
	options: {
		log: true
	},
	combineIt: {
		options: {
			beautify: false
		},
		src: '<%= paths.dev %>/css/styles.css',
		dest: '<%= paths.dev %>/css/styles.css'
	}
};