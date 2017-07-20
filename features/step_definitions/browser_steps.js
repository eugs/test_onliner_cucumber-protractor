// features/step_definitions/browser_steps.js
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');
var protractor = require('protractor');
var by = new protractor.ProtractorBy();
var EC = new protractor.ProtractorExpectedConditions();

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the Onliner page', function() {
    return this.browser.get('https://www.onliner.by');
  });

  Then('I should see the title {stringInDoubleQuotes}', function (text) {
    var css_sel = 'title';
        var actualTitle = this.browser.findElement({css: css_sel})
        .then(function (el) {
          el.getText()
            .then(function (txt) {
              console.log("title: ", txt);
              return (txt  === text);
            })
        })
  });

  When('I go back', function () {
    this.browser.navigate().back();
  })

  //TODO remove
  When('I go to the main page', function () {
      // return this.browser.get('https://www.onliner.by');
      var css = 'a[href="https://www.onliner.by/"]';
      return this.browser.$(css).click()
        .then(()=> {
          console.log("CLICKCCKJCKJ");
          this.browser.sleep(10000);
        })
  });

  When('I click on {stringInDoubleQuotes}', function (text) {
    // return this.browser.element(by.cssContainingText('.project-navigation__sign', text)).click();
    var condition = this.browser.element(by.linkText(text));

    this.browser.wait(EC.presenceOf(condition), 5000)
      .then( ()=> {
        return this.browser.element(by.linkText(text)).click();
    })

    // this.browser.sleep(3000);
    // return this.browser.findElement({linkText: text}).then(function(element) {
    //   return element.click();
    // });

  });

  When('I add to comparison', function () {
    // var condition = EC.visibilityOf(this.browser.element(by.css('#product-compare-control')));
    // this.browser.wait(condition, 5000);
    //
    // this.browser.executeScript("arguments[0].scrollIntoView();", this.browser.element(by.css('#product-compare-control')));
    //
    //  return this.browser.element(by.css('#product-compare-control')).click();

    this.browser.$('.catalog-masthead-controls__item.catalog-masthead-controls__item_compare').click();
  });

  When('I see the comparison', function () {
    this.browser.$('.compare-button__sub.compare-button__sub_main').click()
      // .then( ()=> {
        // this.browser.$('title').getText()
        this.browser.getTitle()
      .then(function (title) {
        console.log("TITLE: ", title);
      // })
    })
  });

  When('I choose {stringInDoubleQuotes}', function (text) {
    // var loc = '#schema-filter > div:nth-child(1) > div:nth-child(3) > div.schema-filter__facet > ul > li:nth-child(4) > label > span.schema-filter__checkbox-text';

    var cb = this.browser.element.all(by.cssContainingText('span', text)).first();

    // var cb = this.browser.element(by.css(loc));
    this.browser.driver.executeScript("arguments[0].scrollIntoView();", cb.getWebElement())
      .then(()=> {
        return cb.click();
      });

    // var elm = element.all(by.css('.item.item-complex')).get(9);
  });

  Then('notification panel should say {stringInDoubleQuotes}', function (msg) {
      return this.browser.element(by.cssContainingText('a', msg));
        // .then(function (elem) {
        //   console.log("found element ", elem);
        // })
    // return this.browser.$('.compare-button__sub.compare-button__sub_main').getText()
    //   .then(function (txt) {
    //     console.log("MESSAGE: ", txt);
    //     //TODO add assert
    //
    //   })
  });


  Then('Should have been set compare {stringInDoubleQuotes}', function (text) {
    return this.browser.element(by.cssContainingText('a', text));
   });


  // function scrollScript() {
  //   return "arguments[0].scrollIntoView();"
  // }

  Then('I should see the tag {stringInDoubleQuotes}', function (tag) {

    var condition = EC.presenceOf(this.browser.$('.schema-tags__text'));
    this.browser.wait(condition, 8000);
    //TODO add tag search
    // var tags = this.browser.$$('.schema-tags__text');
  });

  When('I searching for {stringInDoubleQuotes}', function (query) {
    var element = this.browser.element(by.css('.fast-search__input'));
    element.sendKeys(query);

    var css_loc = ".result__item.result__item_product";
    var condition = EC.presenceOf(this.browser.element(by.css(css_loc)));
    return this.browser.wait(condition, 10000);
  });

  When('I setting up "{category}" with "{checkbox}"', function (category, checkboxName) {
    // console.log("setting up ", category, " with: ", checkboxName);
    // var fields = this.browser.element.all(by.css('.schema-filter__fieldset'))
    var css_loc = '.schema-filter__fieldset .schema-filter__facet span[class="schema-filter__checkbox-text"]';

//     var checks = this.browser.$$(css_loc)
//       .then(function (ar) {
//         console.log("FIND: ", ar.length);
//       })
//
//     // var checks = this.browser.$$(css_loc)
//       .filter(function(element, index) {
//         element.getText().then(function(text) {
//           console.log("TEFSDF HERE : ", "'" +text + "'");
//             console.log("compars : ", category, (text  === checkboxName));
//             return (text  === checkboxName);
//       });
//     });

// this.browser.$$(css_loc).filter(function(elem, index) {
//   return elem.getText().then(function(text) {
//     // console.log("TEFSDF HERE : ", "'" +text + "'");
//       // console.log("compars : ", checkboxName, (text  === checkboxName));
//     return text === checkboxName;
//   });
// }) .then(function (ar) {
//     // ar[0].click();
//     ar.get(0).click()
//       .then(function () {
//         console.log("CLICKED ");
//         this.browser.sleep(3000);
//       })
//     // console.log("FIND: ", .));
// })
//   // checkbox.isEnabled()
  //   .then(function (txt) {
  //     console.log("NAME: ", txt);
  //   })


})
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

  Then('I should see {stringInDoubleQuotes}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 5000);
  });

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

});
