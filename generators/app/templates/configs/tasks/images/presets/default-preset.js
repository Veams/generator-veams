const imageConfig = require('../images.config');

const defaultPreset = [
	{
		width: '20px',
		rename: {
			suffix: `${imageConfig.suffix}preload`
		}
	},
	{
		width: '320px',
		rename: {
			suffix: `${imageConfig.suffix}320`
		}
	},
	{
		width: '480px',
		rename: {
			suffix: `${imageConfig.suffix}480`
		}
	},
	{
		width: '640px',
		rename: {
			suffix: `${imageConfig.suffix}640`
		}
	},
	{
		width: '768px',
		rename: {
			suffix: `${imageConfig.suffix}768`
		}
	},
	{
		width: '1024px',
		rename: {
			suffix: `${imageConfig.suffix}1024`
		}
	},
	{
		width: '1280px',
		rename: {
			suffix: `${imageConfig.suffix}1280`
		}
	},
	{
		width: '1920px',
		rename: {
			suffix: `${imageConfig.suffix}1920`
		}
	}
];

module.exports = defaultPreset;