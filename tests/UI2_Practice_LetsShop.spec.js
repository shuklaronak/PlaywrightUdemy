const {test, expect} = require("@playwright/test")

test('LetsShop Practice', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log("Page Title: "+ await page.title());

    const username = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const loginButton = page.locator("input#login");
    const registerAccountLink = page.locator("p.login-wrapper-footer-text a");

    const firstname = page.locator("input#firstName");
    const lastname = page.locator("input#lastName");
    const phonenumber = page.locator("input#userMobile");
    const confirmPassword = page.locator("input#confirmPassword");
    const eighteenpluscheck = page.locator('[type="checkbox"]');

    const accouncreatedmessage = page.locator("h1.headcolor");
    const loginpagebutton = page.locator("button.btn");

    // await registerAccountLink.click();
    // await firstname.fill("John");
    // await lastname.fill("Doe");
    // await username.fill("johndoe05@gmail.com");
    // await phonenumber.fill("1234567890");
    // await password.fill("Learning123@");
    // await confirmPassword.fill("Learning123@");
    // await eighteenpluscheck.check();
    // await loginButton.click();

    // await expect(accouncreatedmessage).toContainText("Successfully");
    // await loginpagebutton.click();

    await username.fill("johndoe05@gmail.com")
    await password.fill("Learning123@");
    await loginButton.click();

    // await page.waitForLoadState("networkidle"); //This is used to wait for the page to load completely. It waits for the network to be idle, which means no more API network requests being made. This is useful when we want to wait for the page to load completely before performing any actions on it.
    await page.locator("div.card b").last().waitFor(); //Upper one is a bit flaky as per official playwright doc. This one can be alternative for that.
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


});