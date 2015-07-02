module.exports = {
	options: {
		pkg: 'package.json'
	},
	major: {
		options: {
			release: 'major'
		},
		src: [
			'package.json',
			'README.md',
			'<%= paths.src %>/templating/partials/blocks/b-version.hbs'
		]
	},
	minor: {
		options: {
			release: 'minor'
		},
		src: [
			'package.json',
			'README.md',
			'<%= paths.src %>/templating/partials/blocks/b-version.hbs'
		]
	},
	patch: {
		options: {
			release: 'patch'
		},
		src: [
			'package.json',
			'README.md',
			'<%= paths.src %>/templating/partials/blocks/b-version.hbs'
		]
	},
	prerelease: {
		options: {
			release: 'prerelease'
		},
		src: [
			'package.json',
			'README.md',
			'<%= paths.src %>/templating/partials/blocks/b-version.hbs'
		]
	}
};