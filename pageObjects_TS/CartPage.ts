import { Locator, Page } from "@playwright/test";

export class CartPage
{
    page : Page;

    checkout : Locator;
    cartProduct : Locator;
    paymentPageLable : Locator;

    constructor(page : Page)
    {
        this.page = page;

        this.checkout = this.page.locator("button[type=button]").nth(1);
        this.cartProduct = this.page.locator(".cartSection h3");
        this.paymentPageLable = this.page.getByText(" Payment Method ");
    }

    async verifyProductInCart(productName : string)
    {
        const product : any = await this.cartProduct.textContent(); 
        if(product===productName)
            console.log("Product is in cart");
    }

    async checkoutCart()
    {
        await this.checkout.click();
        await this.paymentPageLable.waitFor();
    }
}