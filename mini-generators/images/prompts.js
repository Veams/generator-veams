module.exports = function prompts() {
	return [
		{
			name: 'images',
			type: 'checkbox',
			message: 'Which image features do you want to use?',
			choices: [
				{
					name: 'Responsive Images Generation',
					value: 'imgResponsive',
					checked: true
				},
				{
					name: 'Image Size Data Export',
					value: 'imgSizeExport',
					checked: false
				},
				{
					name: 'Lazy Loading Support for Images (Lazysizes.js)',
					value: 'imgLazyLoad',
					checked: true
				},
				{
					name: 'Picture Support for older Browsers (Picturefill.js)',
					value: 'imgPicturefill',
					checked: false
				}
			],
			default: this.config.get('images')
		}
	];
};
