const {expect} = require('@playwright/test')

class OrderSummaryPage
{
    constructor(page)
    {
        this.page = page;

        this.orderID = this.page.locator(".col-md-6 .-main");
    }

    async verifyOrderSummary(order_id)
    {
        await this.orderID.waitFor()
        console.log(await this.orderID.textContent())
        expect(this.orderID).toHaveText(order_id)
    }
}

module.exports = {OrderSummaryPage}