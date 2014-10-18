/**
 * Handlebars Helpers: {{partial}}
 * Copyright (c) 2013 Jon Schlinkert
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

	/**
	 * {{partial}}
	 * Alternative to {{> partial }}
	 *
	 * @param  {String} name    The name of the partial to use
	 * @param  {Object} context The context to pass to the partial
	 * @return {String}         Returns compiled HTML
	 * @xample: {{partial 'foo' bar}}
	 */
	function partial(name, context) {
		if (!Array.isArray(assemble.partials)) {
			assemble.partials = [assemble.partials];
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

		// Remove page content from `this` and `opts` before creating new context
		context = _.extend({}, grunt.config.data, omit(opts), omit(this), opts.data[name], metadata, context);
		context['root'] = (omit(opts)).data;
		// process any templates inside context property values
		context = grunt.config.process(context);

		// look up this partial name from the partials registered with Handlebars
		var template = Handlebars.partials[name];

		var fn;
		if (!_.isFunction(template)) {
			// not compiled, so we can compile it safely
			fn = Handlebars.compile(template);
		} else {
			// already compiled, just reuse it
			fn = template;
		}

		var output = fn(context).replace(/^\s+/, '');

		// Prepend output with the filepath to the original partial
		var include = opts.include || opts.data.include || {};
		if (include.origin === true) {
			output = '<!-- >>> ' + filepath + ' -->\n' + output + '<!-- ' + filepath + ' <<< -->\n';
		}

		return new Handlebars.SafeString(output);
	}

	Handlebars.registerHelper('partial', partial);

	/**
	 *
	 * @param  {options}
	 * @return {String} Returns compiled HTML
	 * @example: Handlebars.registerHelper('panel', namedOptionWrapper);
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

	function grid(options) {
		var defaultPartialName = 'f-grid';
		var initializer = 'grid';
		return namedOptionWrapper.call(this, defaultPartialName, initializer, options);
	}

	Handlebars.registerHelper('grid', grid);

	function gridItem(options) {
		var defaultPartialName = 'f-grid__item';
		var initializer = 'gridItem';
		return namedOptionWrapper.call(this, defaultPartialName, initializer, options);
	}

	Handlebars.registerHelper('gridItem', gridItem);
};