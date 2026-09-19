@Scenario2
Feature: Login validations

    Scenario Outline: Login with different creds
        Given Page is loaded and logged in using "<username>" and "<password>"

        Examples:
            | username            | password     |
            | johndoe05@gmail.com | Learning123@ |
            | johndoe04@gmail.com | Learning123@ |