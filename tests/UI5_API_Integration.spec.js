const {test, expect, request} = require("@playwright/test")

const loginPayload = {userEmail:"johndoe05@gmail.com",userPassword:"Learning123@"}; //Fetched from browser network. key do not need quotations.
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};

let accessToken;
let orderID;

test.beforeAll( async()=>         //This will run once in the beginning
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",  //POST API call
        {data:loginPayload}) //creds in it

    expect(loginResponse.ok()).toBeTruthy();

    const jsonResponse = await loginResponse.json()

    accessToken = jsonResponse.token;  //extracted from response
    console.log(accessToken)

    //create order API
    const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data : orderPayload,
            headers : {
                'Authorization' : accessToken,
                'Content-Type' : 'application/json'
            }

        });

    const orderResonseJson = await createOrderResponse.json();
    orderID = orderResonseJson.orders[0];
    console.log("API Order: "+orderID);
});


test('Login using accessToken & create an order through API', async({page})=>
{
    await page.addInitScript(value=>   //Inserting token in the browser local storage to bypass login
    {
        window.localStorage.setItem('token',value)
    }, accessToken);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log("Page Title: "+ await page.title());


    //view ordered product
    await page.locator("[routerlink*='myorders']").first().click()
    await page.locator("tbody").waitFor()

    const orders = page.locator("tbody .ng-star-inserted")
    const orderCount = await orders.count()
    console.log("OrderCount: "+orderCount)

    for(let i=0; i<orderCount; i++)
    {
        const id = await orders.locator("th").nth(i).textContent()
        console.log("id: "+id)
        if(id===orderID)
        {
            await orders.nth(i).locator("button").first().click()
            break
        }
    }

    await page.locator(".col-md-6 .-main").waitFor()
    console.log(await page.locator(".col-md-6 .-main").textContent()) 
    expect(page.locator(".col-md-6 .-main")).toHaveText(orderID) //validating on ordered product page

})