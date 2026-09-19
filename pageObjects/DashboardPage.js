class DashboardPage
{
    constructor(page)
    {
        this.page = page;

        this.products = this.page.locator("div.card b");
        this.productsCard = this.page.locator("div.card-body");
        this.cartButton = this.page.locator("[routerlink*=cart]");
        this.cartProducts = this.page.locator("div ul li button");

    }


    async addProductToCart(productName)
    {
        const productNames = await this.products.allTextContents();
        console.log("Products: "+ await productNames);

        const productcount = await this.productsCard.count();

        for(let i=0; i<productcount; i++)
        {
        const prod = await this.productsCard.nth(i).locator("b").textContent();
        if(prod===productName)
            {
                await this.productsCard.nth(i).locator("text= Add To Cart").click();
                break
            }     
        }

        
    }

    async navigateToCart()
    {
        await this.cartButton.click();

        await this.cartProducts.first().waitFor();
    }
}

module.exports = {DashboardPage}