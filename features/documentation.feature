# features/documentation.feature
Feature: Example feature
  As a user of Onliner.by
  I want to see Catalog
  So that I can find mobile phones

#  Scenario: Reading documentation
#    Given I am on the Onliner page
#    When I click on "Каталог"
#    Then I should see "Running specific features"

Scenario: Searching for phones
    Given I am on the Onliner page
    Then I should see the title "Onliner.by"
  #  When I click on "Каталог"
  #  Then I should see "Каталог"
  #  When I click phones
  #  Then I should see the title "Мобильный телефон купить в Минске"
