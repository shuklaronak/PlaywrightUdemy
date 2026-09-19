const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { PO_MANAGER } = require('../../pageObjects/PO_MANAGER')
const playwright  = require('@playwright/test');
const path = require('path');

// Synchronous
Before(async function () {          //This will execute before each scenario
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.manager_po = new PO_MANAGER(this.page);
});

After({tags: '@TC2'},function () {  //This is tagged hook, It'll only run for @TC2 tagged scenario

    console.log("------------In After Hooks method-----------")
})

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path:'failedss.png'})
    }
    
})