# Prototype Generator

[![NPM](https://nodei.co/npm/generator-prototype.png?downloads=true&stars=true)](https://nodei.co/npm/generator-prototype/)



> [Yeoman][yeoman] generator for Prototype.

## Getting started

### Requirements

* Node.js & Node Package Manager
* Grunt Command Line Interface – npm install -g grunt-cli
* SASS 3.4 (because of @-root used in grunticon-mixin) – gem install sass
* Compass 1 (because of Source Maps) – gem install compass --pre 

### Installation 

- Install Yeoman:
    `npm install -g yo`

- Install the package via:
    `npm install -g generator-prototype`

- Or copy the repository via clone to your directory (it depends on the system, just find your directory with yo installed):
    `git clone https://github.com/Prototype-Group/generator-prototype.git 
	~/AppData/Roaming/npm/node_modules`
 
## Usage

### Prototype app scaffolds.

```bash
mkdir project && cd project
yo prototype
```

#### Options

* `-s` alias `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `-w` alias `--skip-welcome-message`

  Skips app welcome message.

## Quick Start
You can scaffold your project in an instance. The first question is:

"Choose your installation routine"

If you choose "Standard installation" you skip the rest of the questions and get the default values. 

## Plugins and Modules

There are standard grunt modules I use. These are:

 * [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) - Clean your directories.
 * [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) - Run grunt tasks concurrently .
 * [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) - Minify your CSS.
 * [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint) - Check your html for errors.
 * [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) - Check your js for errors.
 * [grunt-jsbeautifier](https://github.com/vkadam/grunt-jsbeautifier) - Format your js and html files.
 * [grunt-prettysass](https://github.com/brandonminch/grunt-prettysass) - Format your SASS/SCSS-files.
 * [grunt-combine-media-queries](https://github.com/stefanjudis/grunt-combine-media-queries) - When you use mixins for media queries in your SASS files, you can combine your media queries with this module
 * [jit-grunt](https://github.com/shootaroo/jit-grunt) - A JIT(Just In Time) plugin loader for Grunt.
 * [time-grunt](https://github.com/sindresorhus/time-grunt) - Displays the execution time of grunt tasks.

***But you can also apply additional addons and grunt modules to your project. Just choose specific ones:***
 
### Assemble

 * permalinks
 * assemble-contrib-contextual
 * assemble-contrib-sitemap
 * assemble-related-pages
 * assemble-markdown
 
### Grunt modules

 * [grunt-devtools](https://github.com/vladikoff/grunt-devtools) - An user interface in chrome to execute grunt tasks in your project
 * [grunt-sass](https://github.com/sindresorhus/grunt-sass) - You want to use Libsass instead of Compass to render your stylesheets 10 times faster? Here you go!
 * [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) - Autoprefixer parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
 * [grunticon](https://github.com/filamentgroup/grunticon) - Generate SVG-URI-SASS files with png fallbacks
 * [dr-grunt-svg-sprites](https://github.com/drdk/dr-grunt-svg-sprites) - Generate SVG Sprites with css files
 * [grunt-packager](https://github.com/bobbor/grunt-packager) (only executable when your project.jspackcfg is configured) - package your js
 * [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
 * [grunt-browser-sync](https://npmjs.org/package/grunt-browser-sync) - Sync and auto-reload your local server over multiple devices
 * [grunt-photobox](https://github.com/stefanjudis/grunt-photobox) - Take snapshots from homepage
 * [grunt-bless](https://github.com/stefanjudis/grunt-bless) - Split your css after you reach size limit for ie9
 * [grunt-comment-media-queries](https://github.com/cruncher/grunt-comment-media-queries) - You begin your project with mobile first but need to support desktop styles in IE8? That's your module!
 * [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) - a preconfigured proxy for developing clientside API interfaces in your prototype, with CORS, Basic Authentication support and http methods

## Gruntfile
For our Gruntfile we use the grunt module [load-grunt-configs](https://github.com/creynders/load-grunt-configs/) to split the file up in multiple files. 
These files/tasks you can find in this directory:

 * helpers/_grunt

## JS Libraries and CSS Frameworks
You can choose JS Libraries like:

* jQuery
* BackboneJS
* RequireJS
* AngularJS

And you can also choose SCSS Frameworks like:

* Foundation
* Bourbon Neat
* SASS Bootstrap

All files will be included and configured. Have fun!

## Sub Generators
To help you in your workflow, we integrated some sub generators for you: 

### BackboneJS: 
 
 * Create a Backbone Model: yo prototype:bm
 * Create a Backbone View: yo prototype:bv
 * Create a Backbone Collection: yo prototype:bc

### Grunt Modules:

* Install your grunt modules: yo prototype:gm

Others will follow.

## Developer Documentation
Generator-Prototype provides a way to document your assemble modules via markdown and a separate docs folder. 
Just use the custom installation route and check: 
* _Create Developer Documentation_

For further informations and instructions see: 
* [assemble-documentation-example](https://github.com/Sebastian-Fitzner/assemble-documentation-example)


## Alternative

 * [grunt-init-assemble](https://github.com/assemble/grunt-init-assemble)
 * [generator-assemble](https://github.com/assemble/generator-assemble)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[yeoman]: http://yeoman.io/

## TODO:
 * CMS Snippets
