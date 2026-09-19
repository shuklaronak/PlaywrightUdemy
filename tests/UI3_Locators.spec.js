const {test,expect} = require("@playwright/test")

// test('Locator Demo',async ({page})=>
// {

//     test.setTimeout(45000) //TEST LEVEL TIMEOUT //default in config file is set to 30000s
//     //waitFor() has timeout of 45secs
//     page.setDefaultTimeout(12000); //TEST LEVEL ACTION TIMEOUT

//     const slowExpect = expect.configure({timeout: 15000}); //(TEST LEVEL WAIT)

//     await page.goto("https://rahulshettyacademy.com/angularpractice/")

//     await page.getByLabel("Check me out if you Love IceCreams!").check()

//     await page.getByLabel("Employed").check()

//     await page.getByLabel("Gender").selectOption("Female")

//     await page.getByPlaceholder("Password").fill("Learning")

//     await page.getByRole("button",{name:'Submit'}).click()

//     // default expect wait is 5 secs(GLOBAL LEVEL WAIT)
//     await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});
//     // changing wait time for specific element(STEP LEVEL WAIT)

//     console.log(await page.getByText(" The Form has been submitted successfully!.").textContent())

//     await page.getByRole("link",{name:'Shop'}).click()

//     await slowExpect(page.getByRole("heading",{name:'Shop Name'})).toHaveText("Shop Name") //slow expect use(TEST LEVEL WAIT)

//     await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:'Add'}).click({timeout:15000});

//     await page.getByText("Checkout").click()
    
//     await page.pause()

// });

test('test 1',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/")

    await page.getByLabel("Check me out if you Love IceCreams!").check()

    await page.getByLabel("Employed").check()

    await page.getByLabel("Gender").selectOption("Female")

    await page.getByPlaceholder("Password").fill("Learning")

    await page.getByRole("button",{name:'Submit'}).click()

    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible();
    
    console.log(await page.getByText(" The Form has been submitted successfully!.").textContent())

    await page.getByRole("link",{name:'Shop'}).click()

    await expect(page.getByRole("heading",{name:'Shop Name'})).toHaveText("Shop Name") //slow expect use(TEST LEVEL WAIT)

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button",{name:'Add'}).click();

    await page.getByText("Checkout").click()
    


});