const {test,expect} = require('@playwright/test')


// test.describe.configure({mode:'parallel'});  //All the tests will be executed parallely
test.describe.configure({mode:'serial'});  //It will run tests serially, but after failure at any TC, it will skip the rest of the TCs. Dependency


test('Parallel 1',async ({page})=>  
{
    await page.goto("https://google.com/")
    console.log("PAGE TITLE:"+ await page.title())
});

test('Parallel 2',async ({page})=>  
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log("PAGE TITLE:"+ await page.title())
    expect(true).toBeFalsy();      //Failing intensionally to check serial failure stop. 
});


test('Parallel 3',async ({page})=>  
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log("PAGE TITLE:"+ await page.title())
});