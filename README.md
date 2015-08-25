<p align="center">
	<strong>One of the most flexible and efficient <a href="http://yeoman.io">Yeoman</a> generator to build Frontend Web Apps, HTML5 web interfaces and Prototypes.</strong>
	<br><br>
	<a href="http://prototype-generator.com">Visit the Veams website.</a><br><br>
	<a href="http://badge.fury.io/js/generator-veams"><img src="https://badge.fury.io/js/generator-veams.svg" alt="NPM version" /></a>
	<a href="https://travis-ci.org/Sebastian-Fitzner/generator-veams"><img src="https://travis-ci.org/Sebastian-Fitzner/generator-veams.svg" alt="Build Status" /></a>
	<a href="http://en.wikipedia.org/wiki/MIT_License"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" /></a>
	<a href="https://nodei.co/npm/generator-veams/"><img src="https://nodei.co/npm/generator-veams.png?mini=true" alt="NPM install" /></a>
</p>

## Getting started

### Requirements

* Node.js & Node Package Manager
* Grunt Command Line Interface – npm install -g grunt-cli

### Installation 

- Install Yeoman: `npm install -g yo`

- Install `Veams` via: `npm install -g generator-veams`

### Update
- Update `Veams` via: `npm update -g generator-veams`

### Usage

#### Scaffold your new web app project.

```bash
yo veams
```

##### Options

* `-s` alias `--skip-install`: Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

#### Quick Start
You can scaffold your project in an instance. The first question is:

```
"Choose your installation routine"
```

If you choose `Minimal installation` you skip the rest of the questions and get the default values with:
* Libsass (grunt-sass)
- Task Runner: Grunt
* Grunt modules: `grunt-combine-mq`, `grunt-dr-svg-sprites`
* Assemble as template engine

## Structure

``` bash
├───helpers
│   ├───configs
│   ├───templates
│   │   ├───grunticon-template
│   │   └───svg-sprites
│   ├───_grunt
│   └───_gulp
├───resources
│   ├───ajax
│   ├───assets
│   │   ├───fonts
│   │   ├───img
│   │   │   ├───svg
│   │   │   │   └───icons
│   │   └───media
│   ├───bower-components
│   ├───js
│   ├───scss
│   │   ├───global
│   │   ├───icons
│   │   └───utils
│   │       ├───extends
│   │       └───mixins
│   └───templating
│       ├───data
│       ├───helpers
│       ├───layouts
│       ├───pages
│       └───partials
├───_dist
└───_output
```

## Task Runners

Veams supports `Grunt` and/or `Gulp` as task runner. Our primary task runner is `Grunt`, so when you have some ideas how we can improve our `Gulp` workflow just open an issue. 

### Grunt

For Grunt and our Gruntfile we use the grunt module [load-grunt-configs](https://github.com/creynders/load-grunt-configs/) to split up the file in multfniple task files. 
You can find these task files in the following directory:

 * helpers/_grunt
 
#### Grunt Modules

There are standard grunt modules we use. These are:

 * [grunt-combine-mq](https://github.com/frontendfriends/grunt-combine-mq) - When you use mixins for media queries in your SASS files, you can combine your media queries with this module.
 * [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) - Run grunt tasks concurrently.
 * [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) - Clean your directories.
 * [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) - Minify your CSS.
 * [grunt-sass-globber](https://github.com/Sebastian-Fitzner/grunt-sass-globber) - This module provides a simple globbing functionality for sass files like the ruby gem sass-globbing.
 * [jit-grunt](https://github.com/shootaroo/jit-grunt) - A JIT(Just In Time) plugin loader for Grunt.
 * [time-grunt](https://github.com/sindresorhus/time-grunt) - Displays the execution time of grunt tasks.
 
**Optional Grunt modules**

_But you can also apply additional addons and gulp modules to your project. Just choose specific ones:_

 * [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) - Autoprefixer parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
 * [grunt-bless](https://github.com/stefanjudis/grunt-bless) - Split your css after you reach size limit for ie9.
 * [grunt-browser-sync](https://npmjs.org/package/grunt-browser-sync) - Sync and auto-reload your local server over multiple devices.
 * [grunt-browserify](https://github.com/jmreidy/grunt-browserify) - Use a node-style require() to organize your browser code and load modules installed by npm.
 * [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) - a preconfigured proxy for developing clientside API interfaces in your web app, with CORS, Basic Authentication support and http methods.
 * [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) - Minify your HTML files.
 * [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs) - Optimize RequireJS projects using r.js.
 * [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - Minify files with UglifyJS.
 * [grunt-csscomb](https://github.com/csscomb/grunt-csscomb) - The grunt plugin for sorting CSS properties in specific order.
 * [grunt-dr-svg-sprites](https://github.com/drdk/grunt-dr-svg-sprites) - Generate SVG Sprites with scss files. We provide a custom template to generate mixins and extends.
 * [grunt-grunticon](https://github.com/filamentgroup/grunticon) - Generate SVG-URI-SASS files with png fallbacks.
 * [grunt-image-size-export](https://github.com/Sebastian-Fitzner/grunt-image-size-export) - Pass a folder of images to this module and get infos like width, height, filename, path and breakpoints.
 * [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc) - This plugin enables you to integrate the generation of comments based documentation into your Grunt build.
 * [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr) - grunt-modernizr sifts through your project files, gathers up your references to Modernizr tests and outputs a lean, mean Modernizr machine.
 * [grunt-packager](https://www.npmjs.com/package/grunt-packager) (only executable when your project.jspackcfg is configured) - package your JS.
 * [grunt-phantomas](https://github.com/stefanjudis/grunt-phantomas) - PhantomJS-based web performance metrics collector and monitoring tool.
 * [grunt-photobox](https://github.com/stefanjudis/grunt-photobox) - Take snapshots from homepage
 * [grunt-postcss-separator](https://github.com/Sebastian-Fitzner/grunt-postcss-separator) - Split up your Data-URI or anything else into a separate CSS file.
 * [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images) - Produces images at different sizes (be sure you have installed GraphicsMagick).
 * [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin) - Minify SVG using SVGO.
 * [grunt-version](https://github.com/kswedberg/grunt-version) - Grunt task to handle versioning of a project.

### Gulp

For Gulp and our Gulpfile we use the node module [require-dir](https://www.npmjs.com/package/require-dir) to split up the file in multiple task files. 
You can find these task files in the following directory:

 * helpers/_gulp
 
#### Gulp Modules

There are standard Gulp modules we use. These are:

* [del](https://www.npmjs.com/package/del) - Clean your directories.
* [gulp-sequence](https://www.npmjs.com/package/gulp-sequence) - Run gulp tasks in a sequence.
* [browser-sync](https://www.npmjs.com/package/browser-sync) - Sync and auto-reload your local server over multiple devices
* [gulp-notify](https://www.npmjs.com/package/gulp-notify) - Add notifications.
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) - Minify your CSS.
* [gulp-filesize](https://www.npmjs.com/package/gulp-filesize) - Return the filesize in your console.
 
**Optional Gulp modules**

_But you can also apply additional addons and gulp modules to your project. Just choose specific ones:_

* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Autoprefixer parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
* [gulp-bless](https://www.npmjs.com/package/gulp-bless) - Split your css after you reach size limit for ie9.
* [gulp-combine-mq](https://www.npmjs.com/package/gulp-combine-mq) - When you use mixins for media queries in your SASS files, you can combine your media queries with this module.
* [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) - Minify your HTML files.
* [gulp-iconify](https://www.npmjs.com/package/gulp-iconify) - A mystical CSS icon solution, grunticon-like build system.
* [gulp-requirejs-optimize](https://www.npmjs.com/package/gulp-requirejs-optimize) - Optimize AMD modules in javascript files using the requirejs optimizer.
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Minify files with UglifyJS.

Further packages will be included in later releases.

### Gulp And Grunt 

When you want to use both at the same time, do it at your own risk. You will probably have to change a few settings. 
Furthermore Gulp will be your primary task runner. To support Grunt tasks in Gulp we use [gulp-grunt](https://www.npmjs.com/package/gulp-grunt). 

## JS Libraries and CSS Frameworks

### JS Libraries|Frameworks

You can choose JS Libraries/Frameworks like:

* jQuery
* BackboneJS
* Exoskeleton
* AmpersandJS
* document-register-element

### CSS Frameworks

And you can also choose SCSS Frameworks like:

* Foundation
* Bourbon and Bourbon Neat
* Bootstrap Sass

All files will be included and configured. Have fun!

## Veams Methodology 
You can scaffold your project with our Veams Methodology. 

Furthermore you can add different bower components we provide: 

* [veams-scss](https://github.com/Sebastian-Fitzner/veams-scss)
* [veams-js](https://github.com/Sebastian-Fitzner/veams-js)
* [veams-components](https://github.com/Sebastian-Fitzner/veams-components)

## Testing 

You can add testing and qa tools. At this state we provide: 

* JS Code Style - JSCS is a code style linter for programmatically enforcing your style guide ([JSCS](https://www.npmjs.com/package/jscs)).
* HTML Hinting - Check your HTML for errors ([gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint), [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint)).
* JS Hinting - Check your JS for errors ([gulp-jshint](https://www.npmjs.com/package/gulp-jshint), [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)).
* E2E (webdriver) - WebdriverIO lets you control a browser or a mobile application with just a few lines of code. (only Grunt at this state: [grunt-webdriver](https://github.com/webdriverio/grunt-webdriver)).

## Template Engines

### Assemble

We use Assemble as template engine. Assemble is a component and static site generator that makes it dead simple to build modular sites, documentation and components from reusable templates and data.
You want to know more? Here you go: [assemble.io](http://assemble.io)

In your installation routine you can choose specific modules for Assemble:

 * assemble-contrib-permalinks
 * assemble-contrib-sitemap
 * assemble-related-pages
 
#### Custom Helpers
We provide some custom helpers to speed up your Assemble workflow. These helpers provide:

* `{{#wrapWith}}` - wrap your markup with predefined templates, useful for grid systems
* `{{#mergeData}}` - merge two data objects
* `{{#repeat}}` or `{{#times}}` - repeat elements
* `{{#limit}}` - limit JSON output
* and a few more ...

## Features

Veams supports different features. Just check/uncheck them in the __custom installation routine__:

* You want to add a separate distribution folder? - Check!
* You want to add a CSS Styleguide and Assemble Development Documentation? - Check! (See "Developer Documentation")

## Sub Generators
We integrated some sub generators for you:

### Grunt Modules:
You forgot a grunt module?
* Install further grunt modules: `yo veams:grunt`

### Handlebars Template Helpers:
You want to install custom handlebars helpers? 
* Here you go: `yo veams:templating`

### Backbone|Exoskeleton|Ampersand:
We have integrated a sub generator which you can pass one argument and one option to create a model, view or collection. 

**Arguments (required):**

The sub generator expects any of the following arguments:
* `Model`
* `Collection`
* `View`

**Options:**

Furthermore you can pass an option with `--`. This option is only important when you do want to use AMD or CommonJS syntax instead of ES Harmony syntax.
* `--amd`
* `--commonjs`

**Example:**

``` bash
yo veams:js View --commonjs
```

## Release History
see: [Changelog.md](CHANGELOG.md)

## TODO: 
- Own template wrapper for handlebars
- Update code base to match new yeoman-generator terms