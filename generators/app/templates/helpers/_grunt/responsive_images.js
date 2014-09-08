module.exports = {
	img: {
		options: {
			sizes: [
				{
					name: 'mobile_p',
					width: 320
				},
				{
					name: 'mobile_l',
					width: 640
				},
				{
					name: "desktop",
					width: 1024,
					quality: 80
				},
				{
					name: "hd",
					width: 1920,
					suffx: "_2x",
					quality: 50
				}
			]
		},
		files: [
			{
				expand: true,
				src: ['**.{jpg,gif,png}'],
				cwd: '<%= paths.src %>/assets/img/temp/base',
				dest: '<%= paths.src %>/assets/img/temp/pictures'
			}
		]
	}
};