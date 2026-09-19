const {test,expect} = require("@playwright/test")

test('Validation Test',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://www.google.com/")
    // await page.goBack()
    // await page.goForward()

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'elementSS.png'})  //partial screenshot
    await page.locator("#hide-textbox").click()
    await page.screenshot({path: 'screenshot1.png'})   //page screenshot
    await expect(page.locator("#displayed-text")).toBeHidden();

    //popup dialog box
    page.on('dialog',dialog=>dialog.accept())
    await page.locator("#confirmbtn").click()
    
    //Mouse Hover
    await page.locator("#mousehover").hover()


    //frames handle

    const framePage = page.frameLocator("#courses-iframe")
     


})

test("Screenshot Validation", async({page})=>
{
    await page.goto("https://www.epochconverter.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png')      //COMPARE SCREENSHOTS
})