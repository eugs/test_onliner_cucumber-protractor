var {defineSupportCode} = require('cucumber');
var world = require('../support/world.js');

defineSupportCode(function({After}) {

  After(function() {
    console.log("After");
    return this.browser.driver.quit();
  });

});
