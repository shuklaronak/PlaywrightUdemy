import { expect, Locator, Page } from '@playwright/test'

export class OrderSummaryPage
{
    page : Page
    orderID : Locator

    constructor(page : Page)
    {
        this.page = page;

        this.orderID = this.page.locator(".col-md-6 .-main");
    }

    async verifyOrderSummary(order_id : string)
    {
        await this.orderID.waitFor()
        console.log(await this.orderID.textContent())
        expect(this.orderID).toHaveText(order_id)
    }
}

module.exports = {OrderSummaryPage}