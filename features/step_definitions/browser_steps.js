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
		this.browser.wait(EC.elementToBeClickable(element), 5000)
      .then(()=> {
        return element.click();
      })
  });

  When('I find and click {stringInDoubleQuotes}', function(text) {
    this.browser.sleep(2000);
		var element = this.browser.element(by.cssContainingText('span', text));
    this.browser.wait(EC.presenceOf(element), 8000).then(()=> {
        this.browser.executeScript("arguments[0].scrollIntoView();", element);
        return element.click();
    })
	});

  When('I delete comparisons', function () {
    del_btn = this.browser.$('a[class="product-table__clear button button_small button_gray"]');
    del_btn.click()
    .then(()=> {
      return console.log("deleted");
      //TODO assert
    })
  });

  When('I add to comparison', function () {
    var element = this.browser.$('#product-compare-control');
    this.browser.wait(EC.presenceOf(element), 5000).then(()=> {
      return element.click();
    })
  });

  //TODO refactor
  Then('I compare first is better', function () {
    var first_loc = 'td:nth-child(3).product-table__cell.product-table__cell_accent';
    var second_loc = 'td:nth-child(4).product-table__cell.product-table__cell_accent';
    var first = 0;
    var second = 0;

		this.browser.$$(first_loc).count().then(res => {
			first = res;
		})
		.then(() => {
			this.browser.$$(second_loc).count().then(res => {
				second = res;
			})
		})
		.then(() => {
			return assert.isAbove(first, second, 'something is wrong');
		});
	});

  When('I check the comparison page', function () {
    var element = this.browser.$('.compare-button__sub.compare-button__sub_main');
    this.browser.wait(EC.presenceOf(element, 5000)).then(()=> {
        return element.click();
      })
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
        return panel.getText()
          .then((text)=> {
            console.log("panel text: ", text);
            assert.equal(text, msg, "Panel text is wrong: "+text);
          })
  });

  Then('I should see the tag {stringInDoubleQuotes}', function (tag) {
    var condition = EC.elementToBeClickable(this.browser.$('.schema-tags__text'));
    //TODO add tag search
    return this.browser.wait(condition, 5000);
  });

  // Then('I should see {stringInDoubleQuotes}', function (text) {
  //   var xpath = "//*[contains(text(),'" + text + "')]";
  //   var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
  //   return this.driver.wait(condition, 5000);
  // });

  // When('I searching for {stringInDoubleQuotes}', function (query) {
  //   var element = this.browser.element(by.css('.fast-search__input'));
  //   element.sendKeys(query);
  //
  //   var css_loc = ".result__item.result__item_product";
  //   var condition = EC.presenceOf(this.browser.element(by.css(css_loc)));
  //   return this.browser.wait(condition, 10000);
  // });

//   When('I setting up "{category}" with "{checkbox}"', function (category, checkboxName) {
//     // console.log("setting up ", category, " with: ", checkboxName);
//     // var fields = this.browser.element.all(by.css('.schema-filter__fieldset'))
//     var css_loc = '.schema-filter__fieldset .schema-filter__facet span[class="schema-filter__checkbox-text"]';
//
// //     var checks = this.browser.$$(css_loc)
// //       .then(function (ar) {
// //         console.log("FIND: ", ar.length);
// //       })
// //
// //     // var checks = this.browser.$$(css_loc)
// //       .filter(function(element, index) {
// //         element.getText().then(function(text) {
// //           console.log("TEFSDF HERE : ", "'" +text + "'");
// //             console.log("compars : ", category, (text  === checkboxName));
// //             return (text  === checkboxName);
// //       });
// //     });
//
// // this.browser.$$(css_loc).filter(function(elem, index) {
// //   return elem.getText().then(function(text) {
// //     // console.log("TEFSDF HERE : ", "'" +text + "'");
// //       // console.log("compars : ", checkboxName, (text  === checkboxName));
// //     return text === checkboxName;
// //   });
// // }) .then(function (ar) {
// //     // ar[0].click();
// //     ar.get(0).click()
// //       .then(function () {
// //         console.log("CLICKED ");
// //         this.browser.sleep(3000);
// //       })
// //     // console.log("FIND: ", .));
// // })
// //   // checkbox.isEnabled()
//   //   .then(function (txt) {
//   //     console.log("NAME: ", txt);
//   //   })
//
//
// })
      // find manufacturer
      // var field = this.browser.$$('.schema-filter__label span')

//       { var field = this.browser.$$('.schema-filter__fieldset')
//         .$$('.schema-filter__label span')
//           // var categories = field.$$('.schema-filter__label span')
//         .filter(function(element, index) {
//             element.getText().then(function(text) {
//                     // console.log("TEFSDF HERE : ", "'" +text + "'");
//                     // console.log("compars : ", category, (text  === category));
//                   return (text  === category);
//                 });
//       // }).then(function () {
//       //   console.log("CATS: ", categories.length);
//       //
//       // })
//     }).first();
//
//     // find Apple
//     var model = field.all(by.css('span[class="schema-filter__checkbox-text"]'))
//         .then(function (elements) {
//           console.log("found models ", elements.length);
//         })
//
//     // .filter(function(element, index) {
//     //   return element.getText().then(function(text) {
//     //     return text === checkboxName;
//     //   });
//     // }).first().click();
//
//         // field.all(by.css(''))
//         //   .then(function (model) {
//         //     console.log("model : ", model);
//         //   });
//
//       // find Apple
//         // field.all(by.css('.schema-filter__checkbox-text'))
//
//
//
//
//       // })
//       // .then(function (field) {
//       //   console.log("FIELD ", field.length);
//       //
//       // })
//
//
// // list of models
// // .schema-filter__list
//           //
//           // field.getSize()
//           //   .then(function (size) {
//           //     console.log("SIFSDF ", size);
//           //   })
//  }



  // })

  // When('OLD I searching for {stringInDoubleQuotes}', function (text) {
  //   // this.browser.element(by.css('.fast-search__input')).getWebElement().sendKeys(text);
  //   console.log("\nsearch for ", text);
  //   this.browser.sleep(3000);
  //
  //   var el = this.browser.element(by.css('form>input.fast-search__input')).sendKeys(text)
      // .then(function (el) {
      //   el.sendKeys(text);
      //
      // })

      // var search_field = this.browser.findElement({css: '.fast-search__input'})
      //   .then(function (element) {
      //     // console.log("FOUND: ", element.getText().then((txt) =>  {
      //     //   return txt;
      //     element.sendKeys(text);
      //     });

        // var css_loc = ".result__item.result__item_product .product__title";
    //
    // this.browser.element(by.css(css_loc)).getText()
    //   .then(function (element) {
    //     console.log("founded: ", element);
    //   })
    // var condition = seleniumWebdriver.until.elementLocated({css: css_loc});
    // var condition = EC.presenceOf(element(by.css(css_loc)));
    // return this.browser.wait(condition, 5000);
  //   return this.browser.sleep(5000);
  // });


  // When('I click phones', function () {
  //   var css_sel = 'ul.catalog-bar__list a[href="https://catalog.onliner.by/mobile"]';
  //   var condition = seleniumWebdriver.until.elementLocated({css: css_sel});
  //   return this.driver.wait(condition, 5000);
  // });

  // Then('I should see {stringInDoubleQuotes}', function (text) {
  //   var xpath = "//*[contains(text(),'" + text + "')]";
  //   var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
  //   return this.driver.wait(condition, 5000);
  // });



    // When('I go back', function () {
    //   this.browser.navigate().back();
    // })

    //TODO remove
    // When('I go to the main page', function () {
    //     // return this.browser.get('https://www.onliner.by');
    //     var css = 'a[href="https://www.onliner.by/"]';
    //     return this.browser.$(css).click()
    //       .then(()=> {
    //         console.log("CLICKCCKJCKJ");
    //         this.browser.sleep(10000);
    //       })
    // });

    // Then('I should see the title {stringInDoubleQuotes}', function (text) {
    //   var css_sel = 'title';
    //       var actualTitle = this.browser.findElement({css: css_sel})
    //       .then(function (el) {
    //         el.getText()
    //           .then(function (txt) {
    //             console.log("title: ", txt);
    //             return (txt  === text);
    //           })
    //       })
    // });



});
