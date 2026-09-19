class CartPage
{
    constructor(page)
    {
        this.page = page;

        this.checkout = this.page.locator("button[type=button]").nth(1);
        this.cartProduct = this.page.locator(".cartSection h3");
        this.paymentPageLable = this.page.getByText(" Payment Method ");
    }

    async verifyProductInCart(productName)
    {
        if(this.cartProduct.textContent()===productName)
            console.log("Product is in cart");

        
    }

    async checkoutCart()
    {
        await this.checkout.click();
        await this.paymentPageLable.waitFor();
    }
}

module.exports = {CartPage}