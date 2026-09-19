const {expect} = require('@playwright/test')

class OrderConfirmationPage
{
    constructor(page)
    {
        this.page = page;
        this.successOrderMessage = this.page.locator(".hero-primary");
        this.orderid = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton = this.page.locator("[routerlink*='myorders']");
        this.myOrdersTable = this.page.locator("tbody");
    }

    async verifyConfirmationMessage()
    {
        await expect(this.successOrderMessage).toHaveText(" Thankyou for the order. ")
    }

    async getOrderID()
    {
        let orderid = await this.orderid.textContent();
        orderid = orderid.replaceAll("|","").trim();
        console.log(orderid)
        return orderid;
    }

    async gotoMyOrders()
    {
        await this.myOrdersButton.first().click()
        await this.myOrdersTable.waitFor()
    }
}

module.exports = {OrderConfirmationPage}