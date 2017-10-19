module.exports = config = {
	veamsQueryId: 'veams-query',
	jqueryId: 'jquery',
	reactId: 'react',
	handlebarsId: 'handlebars',
	picturefillId: 'picturefill',
	lazysizesId: 'lazysizes',
};

module.exports.veamsJSPreset = [
	config.picturefillId,
	config.lazysizesId
];