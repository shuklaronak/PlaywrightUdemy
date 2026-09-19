@AllTC
Feature: Ecommerce website validation

    @TC1
    Scenario: Placing Order 1
        Given Page is loaded and logged in using "johndoe05@gmail.com" and "Learning123@"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is present in cart
        When Enter details to place order for "India" with email "johndoe05@gmail.com"
        Then Verify order is pressent in orderHistory 

    @TC2
    Scenario: Placing Order 2
        Given Page is loaded and logged in using "johndoe04@gmail.com" and "Learning123@"
        When Add "ADIDAS ORIGINAL" to cart
        Then Verify "ADIDAS ORIGINAL" is present in cart
        When Enter details to place order for "Cuba" with email "johndoe04@gmail.com"
        Then Verify order is pressent in orderHistory 
