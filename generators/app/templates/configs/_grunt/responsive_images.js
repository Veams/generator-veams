module.exports = {
	"img": {
		options: {
			sizes: [
				{
					name: '320',
					width: 320,
					quality: 80
				},
				{
					name: '320_2x',
					width: 640,
					quality: 40
				},
				{
					name: '480',
					width: 480,
					quality: 80
				},
				{
					name: '480_2x',
					width: 960,
					quality: 40
				},
				{
					name: '640',
					width: 640,
					quality: 80
				},
				{
					name: '640_2x',
					width: 1280,
					quality: 40
				},
				{
					name: "768",
					width: 960,
					quality: 80
				},
				{
					name: "768_2x",
					width: 1920,
					quality: 40
				},
				{
					name: "1024",
					width: 1440,
					quality: 80
				}
			]
		},
		files: [
			{
				expand: true,
				src: ['**.{jpg,gif,png}'],
				cwd: '<%= paths.src %>/assets/img/temp/base/',
				dest: '<%= paths.src %>/assets/img/temp/pictures/'
			}
		]
	}
};