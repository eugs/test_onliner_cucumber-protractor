// features/step_definitions/browser_steps.js
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
var protractor = require('protractor');
var by = new protractor.ProtractorBy();

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the Onliner page', function() {
    // return this.driver.get('https://github.com/cucumber/cucumber-js/tree/master');
    return this.browser.get('https://www.onliner.by');
  });

  Then('I should see the title {stringInDoubleQuotes}', function (text) {
    var css_sel = 'title';
        var actualTitle = this.browser.findElement({css: css_sel})
        .then(function (el) {
          el.getText()
            .then(function (text) {
              console.log("title: ", text);
            })
        })
  });

  When('I click on {stringInDoubleQuotes}', function (text) {
    return this.browser.findElement({linkText: text}).then(function(element) {
      return element.click();
    });
  });

  Then('I should see {stringInDoubleQuotes}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 5000);
  });

  When('I click phones', function () {
    var css_sel = 'ul.catalog-bar__list a[href="https://catalog.onliner.by/mobile"]';
    var condition = seleniumWebdriver.until.elementLocated({css: css_sel});
    return this.driver.wait(condition, 5000);
  });

  // Then('I should see {stringInDoubleQuotes}', function (text) {
  //   var xpath = "//*[contains(text(),'" + text + "')]";
  //   var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
  //   return this.driver.wait(condition, 5000);
  // });

});
