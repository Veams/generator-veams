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
			'README.md'
		]
	},
	minor: {
		options: {
			release: 'minor'
		},
		src: [
			'package.json',
			'README.md'
		]
	},
	patch: {
		options: {
			release: 'patch'
		},
		src: [
			'package.json',
			'README.md'
		]
	}
};