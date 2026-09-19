import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage
{
    page : Page;

    countrySearchBar : Locator
    countryDropdown : Locator
    email : Locator
    placeOrder : Locator

    constructor(page : Page)
    {
        this.page = page;

        this.countrySearchBar = this.page.locator('[placeholder*="Country"]');
        this.countryDropdown = this.page.locator("[class*=ta-results]");
        this.email = this.page.locator(".user__name [type='text']");
        this.placeOrder = this.page.locator(".action__submit");
    }

    async fillPaymentDetails(country : string, email : string)
    {

        //Dynamic Dropdown handle to select Country
        await this.countrySearchBar.pressSequentially(country,{delay:100});

        await this.countryDropdown.waitFor()
        const countryCount = await this.countryDropdown.locator("button").count();

        console.log("count: "+countryCount)
        for(let i=0; i<countryCount; i++)
        {
        
            const displayCountry:any = await this.countryDropdown.locator("button").nth(i).textContent();
            console.log("cont: "+displayCountry)
            if(displayCountry.trim()===country)
            {
                await this.countryDropdown.locator("button").nth(i).click();
                break
            }
            
        }

        //email validation
        await expect(this.email.first()).toHaveText(email);
    }

    async placeTheOrder()
    {
        await this.placeOrder.click();
    }
}

module.exports = {PaymentPage}