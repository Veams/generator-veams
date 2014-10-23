/**
 * Handlebars Helpers: {{factory}}
 * Based on {{partial}} Jon Schlinkert
 * Copyright (c) 2014 Henri Podolski, Sebastian Fitzner
 * Licensed under the MIT License (MIT).
 */

var path = require('path');
var _ = require('lodash');
var matter = require('gray-matter');


// Export helpers
module.exports.register = function (Handlebars, options, params) {

	'use strict';

	var assemble = params.assemble;
	var grunt = params.grunt;
	var opts = options || {};
	var i = 0;

	/**
	 *
	 * @param  {options}
	 * @return {String} Returns compiled HTML
	 * @Example
	 *
	 * 1. Add a new folder (factories) in your assemble folder
	 * 2. Add your custom factory partials
	 * 3. Add the new folder to your partial section in your assemble task
	 * 4. Add a new option to your assemble task and assign your factories in JSON format
	 *
	 * factory: [
	 *  {
	 *      "factoryFileName": "my-hbs-file-without-any-extension",
	 *      "factoryHelperName": "my-custom-name"
	 *  }
	 *  ]
	 *
	 *  Now you can use your factory in your project, i.e.: {{#my-custom-name}}{{/my-custom-name}}
	 *
	 */
	function namedOptionWrapper(name, initializer, options) {
		if (!Array.isArray(assemble.partials)) {
			assemble.partials = [assemble.partials];
		}

		var context = {};
		var data;

		if (options.hash) {
			if (options.hash.type) {
				name = options.hash.type;
			}

			if (options.hash.context) {
				context = options.hash.context;
			}
		}

		var filepath = _.first(_.filter(assemble.partials, function (fp) {
			return path.basename(fp, path.extname(fp)) === name;
		}));

		// Process context, using YAML front-matter,
		// grunt config and Assemble options.data
		var pageObj = matter.read(filepath) || {};
		var metadata = pageObj.context || {};

		// `context`           = the given context (second parameter)
		// `metadata`          = YAML front matter of the partial
		// `opts.data[name]`   = JSON/YAML data file defined in Assemble options.data
		//                       with a basename matching the name of the partial, e.g
		//                       {{include 'foo'}} => foo.json
		// `this`              = Typically either YAML front matter of the "inheriting" page,
		//                       layout, block expression, or "parent" helper wrapping this helper
		// `opts`              = Custom properties defined in Assemble options
		// `grunt.config.data` = Data from grunt.config.data
		//                       (e.g. pkg: grunt.file.readJSON('package.json'))

		var omit = function (target) {
			return _.omit(target, 'pages', 'pagination');
		};

		data = Handlebars.createFrame(options.data || {});


		// Remove page content from `this` and `opts` before creating new context
		context = _.extend({}, omit(opts), omit(this), opts.data[name], metadata, context);
		context[initializer] = options.hash;
		context['root'] = (omit(opts)).data;
		// process any templates inside context property values
		context = grunt.config.process(context);

		// look up this partial name from the partials registered with Handlebars
		var template = Handlebars.partials[name];
		var fn1, fn2;

		var templateParts = template.split('{{{yield}}}');
		if (templateParts.length < 1) return;

		fn1 = Handlebars.compile(templateParts[0] || '');
		fn2 = Handlebars.compile(templateParts[1] || '');

		var output = '';
		output += fn1(context, {data: data}).replace(/^\s+/, '');
		output += options.fn(context, {data: data})
		output += fn2(context, {data: data}).replace(/^\s+/, '');

		// Prepend output with the filepath to the original partial
		var include = opts.include || opts.data.include || {};
		if (include.origin === true) {
			output = '<!-- >>> ' + filepath + ' -->\n' + output + '<!-- ' + filepath + ' <<< -->\n';
		}

		return new Handlebars.SafeString(output);
	}

	function registerCustomHelper(element) {
		var factory = element;
		Handlebars.registerHelper(factory.factoryHelperName, function (options) {
			var defaultPartialName = factory.factoryFileName;
			var initializer = factory.factoryHelperName;
			return namedOptionWrapper.call(this, defaultPartialName, initializer, options);
		});
	}

	if (options.factory !== undefined) {
		for (i; i < options.factory.length; i++) {
			var element = options.factory[i];
			registerCustomHelper(element);
		}
	}
};