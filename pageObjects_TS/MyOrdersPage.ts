import { Locator, Page } from "@playwright/test";

export class MyOrdersPage
{
    page : Page
    orderList : Locator

    constructor(page : Page)
    {
        this.page = page;

        this.orderList = this.page.locator("tbody .ng-star-inserted");

    }

    async gotoOrderSummary(order_id : string)
    {
        const orderCount = await this.orderList.count()
        console.log("OrderCount: "+orderCount)

        for(let i=0; i<orderCount; i++)
        {
            const id = await this.orderList.locator("th").nth(i).textContent();
            console.log("id: "+id)
            if(id===order_id)
            {
                await this.orderList.nth(i).locator("button").first().click();
                break
            }
        }
    }

}

module.exports = {MyOrdersPage}