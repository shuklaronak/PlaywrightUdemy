const {test,expect} = require("@playwright/test")

let webContext;

test.beforeAll(async({browser})=>  //Login once
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

    await context.storageState({path: 'state.json'}); //Collect all the storage state data of a browser inside a json file 

    webContext = await browser.newContext({storageState:'state.json'}) //This context opens browser with storage state inserted
    //from this webcontext all the test cases can open browser and skip the ui login steps
})

test('Login Option',async({})=>
{

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    const productNames = page.locator("div.card b").allTextContents();
    console.log("Products: "+ await productNames);


    //Find zara coat and add to cart
    const prodName="ZARA COAT 3"
    const productsCard = page.locator("div.card-body")
    const productcount = await productsCard.count()
    for(let i=0; i<productcount; i++)
    {
        const prod = await productsCard.nth(i).locator("b").textContent()
        if(prod===prodName)
        {
            await productsCard.nth(i).locator("text= Add To Cart").click()
            break
        }     
    }

    const cartButton = page.locator("[routerlink*=cart]");
    await cartButton.click();

    await page.locator("div ul li button").first().waitFor()
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible()
    expect(bool).toBeTruthy()

    const checkout = page.locator("button[type=button]").nth(1)
    checkout.click()

    await page.getByText(" Payment Method ").waitFor()

    //Dynamic Dropdown handle
    const country = "India"
    await page.locator('[placeholder*="Country"]').pressSequentially("ind",{delay:100})

    const countryOptions = page.locator("[class*=ta-results]");
    await countryOptions.waitFor()
    const countryCount = await countryOptions.locator("button").count()

    console.log("count: "+countryCount)
    for(let i=0; i<countryCount; i++)
    {
        
        const cont = await countryOptions.locator("button").nth(i).textContent()
        console.log("cont: "+cont)
        if(cont.trim()===country)
        {
            await countryOptions.locator("button").nth(i).click();
            break
        }
            
    }

    //email validation
    await expect(page.locator(".user__name [type='text']").first()).toHaveText("johndoe05@gmail.com");

    const placeOrder = page.locator(".action__submit")
    await placeOrder.click()

    //oder placed validation
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

    //fetching orderid
    let orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    orderid = orderid.replaceAll("|","").trim()
    console.log(orderid)

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
        if(id===orderid)
        {
            await orders.nth(i).locator("button").first().click()
            break
        }
    }

    await page.locator(".col-md-6 .-main").waitFor()
    console.log(await page.locator(".col-md-6 .-main").textContent())
    expect(page.locator(".col-md-6 .-main")).toHaveText(orderid)

})