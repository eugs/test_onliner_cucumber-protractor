// features/step_definitions/browser_steps.js
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
var protractor = require('protractor');
var by = new protractor.ProtractorBy();
var EC = new protractor.ProtractorExpectedConditions();
var assert = require('chai').assert;
var browser = this.browser;

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the Onliner page', function() {
    return this.browser.get('https://www.onliner.by');
  });

  Then('I should see the title {stringInDoubleQuotes}', function (text) {
    return this.browser.getTitle().then((title)=> {
        assert.equal(title, text)
      })
  });

  When('I click on {stringInDoubleQuotes}', function (text) {
    var element = this.browser.element(by.linkText(text));
		this.browser.wait(EC.elementToBeClickable(element), 5000).then(()=> {
        return element.click();
      })
  });

  When('I find and click {stringInDoubleQuotes}', function(text) {
    // idk
    this.browser.sleep(2000);

		var element = this.browser.element(by.cssContainingText('span', text));
    // this.browser.wait(EC.presenceOf(element), 8000).then(()=> {
    //     this.browser.executeScript("arguments[0].scrollIntoView();", element);
    //     return element.click();
    // })
    return waitAndClick(this, element);
	});

  When('I delete comparisons', function () {
    var del_btn = this.browser.$('a[class="product-table__clear button button_small button_gray"]');
    del_btn.click().then(()=> {
      return console.log("deleted");
    })
  });

  When('I add to comparison', function () {
    var element = this.browser.$('#product-compare-control');
    // this.browser.wait(EC.presenceOf(element), 5000).then(()=> {
    //   return element.click();
    // })
    return waitAndClick(this, element);
  });

  Then('I compare first is better', function () {
    var first_loc = 'td:nth-child(3).product-table__cell.product-table__cell_accent';
    var second_loc = 'td:nth-child(4).product-table__cell.product-table__cell_accent';
    var first = 0;
    var second = 0;

		this.browser.$$(first_loc).count().then((res) => {
			first = res;
		})
		.then(() => {
			this.browser.$$(second_loc).count().then((res) => {
				second = res;
			})
		})
		.then(() => {
			return assert.isAbove(first, second, 'something is wrong, the first phone should be better!');
		});
	});

  When('I check the comparison page', function () {
    var element = this.browser.$('.compare-button__sub.compare-button__sub_main');
    // this.browser.wait(EC.presenceOf(element, 5000)).then(()=> {
    //     return element.click();
    //   })
      return waitAndClick(this, element);
  });

  When('I choose {stringInDoubleQuotes} checkbox', function (text) {
    var cb = this.browser.element.all(by.cssContainingText('span', text)).first();
    this.browser.driver.executeScript("arguments[0].scrollIntoView();", cb.getWebElement())
      .then(()=> {
        return cb.click();
      });
  });

  Then('notification panel should say {stringInDoubleQuotes}', function (msg) {
      var panel = this.browser.$('.compare-button__sub.compare-button__sub_main');
        return panel.getText().then((text)=> {
            console.log("panel text: ", text);
            assert.equal(text, msg, "Panel text is wrong: "+text);
        })
  });

  Then('I should see the tag {stringInDoubleQuotes}', function (tag) {
    var condition = EC.elementToBeClickable(this.browser.$('.schema-tags__text'));
    return this.browser.wait(condition, 5000);
  });

  // ----------------------

  function waitAndClick(context, element) {
    var fakeThis = context;
    fakeThis.browser.wait(EC.presenceOf(element, 5000)).then(()=> {
      return element.click();
    })
  }

});
