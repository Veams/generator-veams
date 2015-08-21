var assert = require('assert');
var testDoc = 'file:///'+ __dirname +'/../../helpers/html/test.html';

describe('grunt-webdriverjs test', function () {

    it('checks if title contains the search query', function(done) {

        browser
            .url(testDoc)
            .getTitle(function(err,title) {
                assert.strictEqual(title, 'Test Document');
             })
            .call(done);
    });

    it('checks if a div with class name test is assigned via javascript on load', function(done) {

        browser
            .url(testDoc)
            .waitForExist('.test',1000).then(function(err,res) {
                console.log(res);
                assert.strictEqual(res, 'Test Document');
            })
            .call(done);
    });
});