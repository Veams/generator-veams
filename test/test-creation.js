/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var fs 		= require('fs');

var defaultPrompts = {
  'projectName': true,
  'projectAuthor': 'Test Author',
  'installAssemble': true,
  'installPlugin': true,
  'plugin': ['assemble-related-pages'],
  'modules': [	'grunt-grunticon', 
  				'grunt-packager',
  				'grunt-browser-sync',
  				'grunt-autoprefixer'
  ],
  'features': [],
  'mobileFirst': false,
  'jsLibs': false,
  'cssLibs': false,
  'installCMS': false
}

describe('prototype-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('prototype:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'config.rb',
      'Gruntfile.js',
      '.gitignore',
      'package.json'
    ];

    helpers.mockPrompt(this.app, defaultPrompts);
    
    this.app.options['skip-install'] = true;
    this.app.options['skip-welcome-message'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});