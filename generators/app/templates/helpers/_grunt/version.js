module.exports = {
	options: {
		pkg: 'package.json'
	},
	major: {
		options: {
			release: 'major'
		},
		src: ['package.json', '<%= paths.src %>/templates/partials/_global/_version.hbs']
	},
	minor: {
		options: {
			release: 'minor'
		},
		src: ['package.json', '<%= paths.src %>/templates/partials/_global/_version.hbs']
	},
	patch: {
		options: {
			release: 'patch'
		},
		src: ['package.json', '<%= paths.src %>/templates/partials/_global/_version.hbs']
	},
	prerelease: {
		options: {
			release: 'prerelease'
		},
		src: ['package.json', '<%= paths.src %>/templates/partials/_global/_version.hbs']
	}
};