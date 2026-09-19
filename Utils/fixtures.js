const base = require('@playwright/test');
const {APIUtils} = require("./APIUtils");
const {request} = require("@playwright/test");

const loginPayload = {userEmail:"johndoe05@gmail.com",userPassword:"Learning123@"};   
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};

exports.customtest = base.test.extend(
{
    authenticatedPage : async({browser}, use)=>
    {
        const context = await browser.newContext();
        const newpage = await context.newPage(); 
        await newpage.goto("https://rahulshettyacademy.com/client/#/auth/login")
        console.log("Page Title: "+ await newpage.title());
        const username = newpage.locator("input#userEmail");
        const password = newpage.locator("input#userPassword");
        const loginButton = newpage.locator("input#login");
        await username.fill("johndoe05@gmail.com")
        await password.fill("Learning123@");
        await loginButton.click();
        await newpage.locator("div.card b").last().waitFor(); 

        await use(newpage); //This command makes this fixture reuseable. All the code above this line will be executed before the test

        //TEAR DOWN (All the code below the use line will be executed after the completion of the test.)
        await context.close();
    },


    createOrder : async({},use)=>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext,loginPayload);
        const response = await apiUtils.createOrder(orderPayload)

        await use(response);
        //TEAR DOWN
        await apiContext.dispose();
    },

    testdatafororder : {          //3rd fixture is javascript object, for test data
        pruductName : 'ADIDAS ORIGINAL'
    }
}
)