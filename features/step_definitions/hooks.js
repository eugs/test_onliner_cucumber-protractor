// features/step_definitions/hooks.js
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After}) {
  After(function() {
    // console.log("After");
    return this.browser.driver.quit();
  });
});
