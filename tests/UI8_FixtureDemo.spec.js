 const {expect} = require("@playwright/test")
const {customtest} = require('../Utils/fixtures')

customtest('Fixtures Demo', async({authenticatedPage, createOrder, testdatafororder})=>
{
    await authenticatedPage.locator("[routerlink*='myorders']").first().click();
    await authenticatedPage.locator("tbody").waitFor();

    await expect(authenticatedPage.getByText(createOrder.orderID)).toBeVisible();
    console.log(testdatafororder.pruductName)
})