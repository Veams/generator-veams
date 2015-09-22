module.exports = {
	options: {
		config: '<%= paths.helpers %>/task-configs/sassdoc.conf.json'
	},
	dist: {
		src: '<%= paths.src %>/scss/**/*.scss'
	}
};