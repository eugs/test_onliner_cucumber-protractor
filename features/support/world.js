// features/support/world.js
require('geckodriver')
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
var protractor = require('protractor');
var plugins_1 = require('protractor/built/plugins.js');


function CustomWorld() {
  // this.driver = new seleniumWebdriver.Builder()
  //   .forBrowser('firefox')
  //   .build();
  driver = new seleniumWebdriver.Builder().forBrowser('firefox');
  this.browser = new protractor.ProtractorBrowser(driver.build());
  this.browser.plugins_ = new plugins_1.Plugins({});
  this.browser.ignoreSynchronization = true;
  
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})

defineSupportCode(function({setDefaultTimeout}) {
  setDefaultTimeout(60 * 1000);
});
