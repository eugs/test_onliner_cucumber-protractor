# features/documentation.feature
Feature: Example feature
  As a user of Onliner.by
  I want to see Catalog
  So that I can sure that iPhone 6s is better than iPhone SE

Scenario: Searching for iPhones
    Given I am on the Onliner page
    Then I should see the title "Onliner.by"

    #----------------------------
    When I click on "Каталог"
    When I click on "Мобильные телефоны"
    Then I should see the title "Мобильный телефон купить в Минске"
    When I choose "Apple" checkbox
    Then I should see the tag "Apple"
      When I find and click "Apple iPhone 6s 16GB Silver"
      Then I should see the title "Смартфон Apple iPhone 6s 16GB Silver купить в Минске"
    When I add to comparison
    Then notification panel should say "1 товар в сравнении"

    #-----------------------------
    When I click on "Каталог"
    When I click on "Мобильные телефоны"
    Then I should see the title "Мобильный телефон купить в Минске"
    When I choose "Apple" checkbox
    Then I should see the tag "Apple"
      When I find and click "Apple iPhone SE 16GB Space Gray"
      Then I should see the title "Смартфон Apple iPhone SE 16GB Space Gray купить в Минске"
    When I add to comparison
    Then notification panel should say "2 товара в сравнении"

    #----------------------
    When I check the comparison page
    Then I should see the title "Сравнить Apple iPhone 6s 16GB Silver, Apple iPhone SE 16GB Space Gray"
    Then I compare first is better
    When I delete comparisons
    Then I should see the title "Каталог Onliner.by"
