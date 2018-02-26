## Namespace Version

### v1.0.0-rc1

- Add webpack
- Add independent image, icons and data tasks
- Add new @veams namespace
- Add reload feature for single-page-app types
- Refactor blueprint generator to simplify custom templates and prompts


----------------------------------------------

## Old Versions

### v8.3.1
- Use darker section headline in docs

### v8.3.1
- Trigger global resize event from app.js

### v8.3.0
- Add veams v5.0.1
- Add veams plugins (vent, store, mixins, modules, templater, dom, media-query-handler, logger)

### v8.2.2
- Bugfix

### v8.2.1
- Fix events.js copy issue and add improvements to app.js if veams 5 is selected

### v8.1.5
- Update Insertpoints in blueprint to print out right folder in standard project setup

### v8.1.4
- Update bp INSERTPOINTS
- Add events.js to src
- Add standard scaffold back to bp generator
- Add standard imports back to project

### v8.1.3
- Fix minor typo issues in bp.js.ejs
- Clean up of task runner files

### v8.1.2
- Fix issue in bp javascript file with const Helpers
- Update bp templates

### v8.1.1
- Bugfixes to support => node v4.x
- Bugfix for babelify

### v8.1.0
- Add browserify support to Gulp
- Add express mangony server to Gulp
- Optimize bp generator
- Optimize scaffold of js files

### v8.0.2 - v8.0.4
- Fix minor bugs with generator blueprint
- Optimize main.js

### v8.0.1
- Update Veams-Query in deps

### v8.0.0
- Add compatibility for newest yo version (^v1.8)
- Add framework Veams 5
- Update packages
- Clean up all test cases
- Bugfixes
- Update blueprint generator to allow scaffolds of custom blueprints
- Delete templating generator

### v7.6.1
- Fix self-contained paths in watch task

### v7.6.0
- Add new Veams-JS version 4
- Bugfix for mangony and browsersync
- Update packages
- Update grunticon
- Add icons webfont
- Add new media mixin lib 
- Add Veams-Query
- Enhance libs scaffold

### v7.5.0
- Add self-contained option
- Update blueprint templates 

### v7.4.0
- Replace grunt-contrib-watch with grunt-chokidar

### v7.3.0
- Add stylelint to generator

### v7.2.2
- Optimize gulp project scaffolds

### v7.2.1
- Fix bug with assemble installation in grunt

### v7.2.0
- Add mangony and browser-sync support with proxy and server port

### v7.1.4
- Bugfix for #70

### v7.1.2
- delete unnecessary helpers when Mangony is selected

### v7.1.1
- wrap data-js-options with if statement in hbs blueprint

### v7.1.0
- add logger (console output element)

### v7.0.6
- update question in templating-generator.js

### v7.0.5
- Fixed some issues with express server and browser-sync

### v7.0.4
- Adjustment of standard styles

### v7.0.2
- Minor improvements for Babelify usage and Mangony in Grunt

### v7.0.0
- Added [Mangony](https://github.com/Sebastian-Fitzner/mangony) as new template engine for Gulp and Grunt
- Updated all package versions
- Added Grunt@1.0.1
- Added further specs

### v6.7.4
- added custom blueprint type support

### v6.7.3
- added global module registry to js blueprint

### v6.7.2
- bugfix release (handlebars)

### v6.7.1
- bugfix release (Gruntfile.js)

### v6.7.0
- added lost grid (PostCSS grid system) 
- added postcss for autoprefixer to Gulp and Grunt

### v6.6.9
- fixed insertpoint `veamsJS-scss-import`

### v6.6.8
- added bp generator tests, 
- updated setup file deletion
- updated bp templates to support utilities

### v6.6.7
- added custom events to blueprint generator
- updated endpoints in config.js

### v6.6.6
- added individual extensions and file types in blueprints generator

### v6.6.5
- added delete functionality for settings file
- minor improvements
- workaround for nodejs problems with lists in console

### v6.6.2
- added utilities support in veams:blueprint
- changed readme scaffold directory in veams:blueprint

### v6.6.0
- added express support, deleted grunt-connect
- added new handlebars helpers (`pictureData`, `concatPath`, `markdown`)
- updated `mergeData` to support files
- updated versioning task
- added possibility to pass blueprints paths to veams:blueprint

### v6.5.3
- minor improvements for better veams-cli integration, updated blueprint generator

### v6.5.2
- updated handlebars page

### v6.5.1
- updated bower-component veams-js

### v6.5.0
- updated config.js to support veams-cli, updated blueprints generator, added page-components.hbs

### v6.4.0
- added blueprints generator to support fast scaffolding of templates for blocks, components or global partials

### v6.2.6
- outsourced event names to config file
- updated bower component veams-sass version
- changed test_helpers
- changed title in page

### v6.2.5
- added postInstall methods to support renaming of config files
- added event handling in generator
- clean up minimal installation routine

### v6.2.4
- fixed bug in gulp `js` task
- added `mergeData` helper to sub generator `templating`

### v6.2.3
- updated grunt-bless task to use `force` in options
- updated stylesheets template for svg-sprites to use mixins only

### v6.2.1
- fixed minor issue with sync task
- updated grunt plugins versions for: 
	- grunt-accessibility
	- grunt-autoprefixer
	- grunt-bless
	- grunt-browser-sync
	- grunt-contrib-copy
	- grunt-contrib-jshint
	- grunt-contrib-jsdoc
	- grunt-contrib-uglify
	- grunt-dr-svg-sprites
	- grunt-text-replace
	- grunt-svgmin
	- grunt-phantomas
	- grunt-sync
	- grunt-connect
	- grunt-concurrent
	- grunt-contrib-cssmin

### v6.2.0
- added grunt-includes as simple js packager alternative
- added further specs for sass frameworks, grunt-includes
- cleaned up Gruntfile.js
- cleaned up watch.js
- added bootstrap-sass to styles.scss

### v6.1.4
- fixed minor issues in documentation scaffold process
- deleted grunt-packager
- added container build in travis.yml

### v6.1.2
- deleted README.md instructions 
- better veams-js installation with `overwriteSetup` method 

### v6.0.0

**General**
- refactored prompts
- added new structure to use separate generator files
- updated packages
- added testing
- renamed package to `veams` because pg is already used at npmjs.org

**Task Runners**
- added first gulp support
- added new structure to use gulp and grunt at the same time

**Testing**
- added Hinting and Code Style Checks
- added WebdriverIO for grunt

**JS**
- added browserify
- added ESHarmony

**Templating**
- added new helpers for handlebars templating 

**CSS and Icons**
- deleted compass 
- added @root to svg-sprites templates

**Sub generators**
- deleted plugin, bm, bv, bc
- added js generator to scaffold js templates with arguments and options

### v0.5.8
- changed resources folder structure: data folder is located in templates
- changed watch task

### v0.5.7
- deleted jit-grunt mappings to reduce complexity

### v0.5.6
- updated bower dependencies
- integrated new grunt modules (grunt-postcss-separator, grunt-image-size-export)
- changed build task
- updated pictures task to support grunt-image-size-export
- deleted styleguide templates
- updated htmlhint

### v0.5.3
- added new sprites icon workflow with custom template and selector function to provide mixins and extends
- updated grunt-sass, grunt-contrib-cssmin, bower components
- updated sg grunt to support new icon workflow

### v0.5.2
- added full test spec 
- added pg packages 
- clean up requirejs files generation
- added grunt-combine-mq to replace deprecated version

### v0.5.0
- outsourced scss mixins and extends into own bower component (pg-scss)
- outsourced yo prototype:components into own bower component (pg-components)
- added bower component (pg-js)
- deleted demo content
- deleted mobile first and ie8 support at the same time
- refactored generator to be up to date with yeoman
- added new specs
- refactored whole specs section
- fixed minor bugs with jsdoc and js-section
- refactored scss section
- renamed factory helper to panel helper, added panel section in templates

### v0.4.72
- updated sub generators to support grunt-sass and autolink helper
- added multiple specs

### v0.4.71
- updated packages in package.json
- added assemble-spec.js

### v0.4.70
- added travis ci
- changed prototype:gm => prototype:grunt
- added prototype:assemble for helper files

### v0.4.69
- grunt-jsdoc@beta added with custom configs
- prototype:gm => added grunt-jsdoc, grunt-contrib-requirejs, grunt-comment-toggler
- Refactored index.js to prepare PG for Gulp support

### v0.4.68
- Split custom partial helper and factory helper
- Added possibility to extend options in Assemble to activate factories

### v0.4.67
- Added grunt-comment-toggler for RequireJS
- Changed components/c-article.hbs

### v0.4.65

**General**
- Refactored Gruntfile.js
- Added loadCSS.js to load CSS Styles asynchronous

**Assemble**
- Added custom helper-partial.js
- Added support for assemble factories
- Added Regions Readme.md

**SASS**
- Added custom breakpoint mixin

### v0.4.64
- Fixed bug with version block
- Fixed async task
- Added c-form.scss 

### v0.4.63
- Added `Regions` for PG Frontend Methodology
- Modified form component 
- Deleted batch files
- Refactored bower directory in demo files
- Added almond and grunt-contrib-requirejs 

### v0.4.62
- Optimized package.json 
- Integrated git submodule for components
- Integrated {{#ifBlock}} helper

### v0.4.61
- Minor change in svg-sprites task 
- Bugfix with version.js
- Mixin: spriteicon() added
- Updated prototype:gm to support automated download of grunt-text-replace
- Changed path for prototype:plugin

### v0.4.60
- Updated grunt-photobox to support grunt-browser-sync or grunt-contrib-connect
- Changed output of photobox to Dev folder

### v0.4.59
- Changed Standard Installation to Minimal Installation
- Optimized svg-sprites and svgmin workflow
- Changed classes fo PG Frontend Methodology

### v0.4.58
- Added fork of grunt-dr-svg-sprites and dr-svg-sprites to support placeholders in scss files
- Changed replace.js to change file path
- Added PG Frontend Methodology
