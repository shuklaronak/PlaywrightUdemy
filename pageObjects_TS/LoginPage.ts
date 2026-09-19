import { Locator, Page } from "@playwright/test";

export class LoginPage
{
    page : Page
    username : Locator
    password : Locator
    loginButton : Locator
    registerAccountLink : Locator
    productsOnlogin : Locator

    constructor(page : Page)
    {
        this.page = page

        this.username = this.page.locator("input#userEmail");
        this.password = this.page.locator("input#userPassword");
        this.loginButton = this.page.locator("input#login");
        this.registerAccountLink = this.page.locator("p.login-wrapper-footer-text a");
        this.productsOnlogin = this.page.locator("div.card b");
    }

    async validLogin(username : string,password : string)
    {
        await this.username.fill(username)
        await this.password.fill(password);
        await this.loginButton.click();
        await this.productsOnlogin.last().waitFor();

    }

    async launchLoginPage()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
        console.log("Page Title: "+ await this.page.title());
    }
}

module.exports = {LoginPage}