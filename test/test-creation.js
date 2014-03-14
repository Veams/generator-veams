/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var fs 		= require('fs');

var defaultPrompts = {
  'projectName': true,
  'projectAuthor': 'Test Author',
  'installDocs': true,
  'installPlugin': true,
  'plugin': ['assemble-related-pages'],
  'installModules': true,
  'modules': [	'grunt-grunticon', 
  				'grunt-packager',
  				'grunt-browser-sync',
  				'grunt-autoprefixer'
  ],
  'sassInsteadOfCompass': false,
  'mobileFirst': false,
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

  after(function(done) {
  	// before each deletes test folder in prototype-generator 0.16.0
  	// as long as it does not work deleteFolderRecursive to the rescue
 //  	var deleteFolderRecursive = function(path) {
	//     var files = [];
	//     if( fs.existsSync(path) ) {
	//         files = fs.readdirSync(path);
	//         files.forEach(function(file,index){
	//             var curPath = path + "/" + file;
	//             if(fs.lstatSync(curPath).isDirectory()) { // recurse
	//                 deleteFolderRecursive(curPath);
	//             } else { // delete file
	//                 fs.unlinkSync(curPath);
	//             }
	//         });
	//         fs.rmdirSync(path);
	//     }
	// };

	// deleteFolderRecursive(path.join(__dirname, 'temp'));
	done();
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