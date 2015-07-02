module.exports = {
	create: function createAlias(alias, helper, Handlebars) {
		Handlebars.registerHelper(alias, function () {
			return helper.apply(this, arguments);
		});
	}
};