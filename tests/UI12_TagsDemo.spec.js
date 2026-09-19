const {test} = require('@playwright/test')

test('@Smoke Parallel 1',async ({page})=>  
{
    await page.goto("https://google.com/")
    console.log("PAGE TITLE:"+ await page.title())
});

test('@Smoke Parallel 2',async ({page})=>  
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log("PAGE TITLE:"+ await page.title())
});


test('@Regression Parallel 3',async ({page})=>  
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log("PAGE TITLE:"+ await page.title())
});

//To run specific tagged once "  npx playwright test tests/UI12_TagAndCommandParameter.spec.js --grep '@Smoke'   "