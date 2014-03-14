/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var fs 		= require('fs');
var answers = require('../test_helpers/prompt-answer-factory')({
  'modules': ['grunt-connect-proxy'],
  'proxyHost': '0.0.0.0',
  'proxyPort': 80
});

describe('grunt-connect-proxy', function () {
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

  it('adds references to package.json and Gruntfile.js', function(done){
    helpers.mockPrompt(this.app, answers);
    this.app.options['skip-install'] = true;
    this.app.options['skip-welcome-message'] = true;
    this.app.run({}, function () {
      helpers.assertFile('package.json', /grunt-connect-proxy/);
      helpers.assertFile('Gruntfile.js', /grunt\.loadNpmTasks\('grunt-connect-proxy'\);/ );
      done();
    });
  });

  // it('creates the helpers/_grunt/connect.js with the specified host and port', function (done) {

  //   helpers.mockPrompt(this.app, answers);
    
  //   this.app.options['skip-install'] = true;
  //   this.app.options['skip-welcome-message'] = true;
  //   this.app.run({}, function () {
  //     helpers.assertFile('helpers/_grunt/watch.js', /\'proxies\'/mg);
  //     done();
  //   });
  // });
});