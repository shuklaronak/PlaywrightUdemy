const {test, expect} = require('@playwright/test');

// ()=> This is an arrow function which is used to define a function in javascript. It is a shorthand way of writing a function expression. 
// The arrow function does not have its own this value, it inherits this value from the enclosing scope.
//  This is useful when we want to access the this value of the enclosing scope inside the function.
//javascript is asynchronous in nature, so we need to use async and await to wait for the page to load before performing any actions on it.
//test coming from playwright module. browser is a built-in object in playwright which is used to launch the browser.
// It needs to be enclosed in curly braces because it is an object. The browser object is used to create a new browser context and a new page.

test('Explicit browser context setup',async ({browser})=>   
{

    const context = await browser.newContext(); // This is used to create a new browser context. A browser context is an isolated environment in which we can run our tests. It is like a new incognito window in the browser. Each test will run in its own browser context, so that the tests do not interfere with each other.
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const username = page.locator('input#username');
    const password = page.locator("[id='password']");
    const signInButton = page.locator("input#signInBtn");
    const errorTile = page.locator("[style*='block']");
    const productTitles = page.locator(".card-body a");

    const userDropdown = page.locator("select.form-control"); //dropdown

    const radioButtons = page.locator("span.radiotextsty"); //radiobuttons

    const webapppopup = page.locator("button#okayBtn"); //webapp popup

    const checkBox = page.locator("input#terms"); //checkbox
   
 
    console.log("PAGE TITLE:"+ await page.title())
    await username.fill('Ronak')
    await password.fill('Learning@830$3mK2')
    await signInButton.click()
    console.log(await errorTile.textContent())
    await expect(errorTile).toContainText("Incorrect") //Validating error message.

    await username.fill("")
    await username.fill("rahulshettyacademy")
    await password.fill("")
    await password.fill("Learning@830$3mK2")

    await userDropdown.selectOption("consult"); //static dropdown selected

    await radioButtons.nth(1).click(); //clicking the second radio button

    await webapppopup.click(); 
    await expect(radioButtons.nth(1)).toBeChecked(); //Validating that the second radio button is checked.
    console.log(await radioButtons.nth(1).isChecked());

    await checkBox.check();
    await expect(checkBox).toBeChecked(); //Validating that the checkbox is checked.
    console.log(await checkBox.isChecked());
    await checkBox.uncheck();
    await expect(checkBox).not.toBeChecked();

    //check if the top right link is blinking or not.
    const blinkingLink = page.locator("[href*='com/documents-request']");

    await expect(blinkingLink).toHaveAttribute("class","blinkingText"); //Validating that the blinking link has the class attribute "blinkingText".



    // await page.pause();                     //This is for debugging purpose. It will pause execution and open a debugging window.

    await signInButton.click()
    await expect(page.locator("h1.my-4")).toBeVisible() 
    console.log("PAGE TITLE: "+ await page.title())

    console.log(await page.locator(".card-body a").nth(1).textContent()) //Getting text from 1 product block.
    console.log(await page.locator(".card-body a").first().textContent())

    const allTitles = await productTitles.allTextContents(); //This allTextContent might give 0 as result if its directly executed after the login. Currently the above ommand gave the app time to load complete page.
    console.log(allTitles)
    
});


test('Switch windows page', async ({browser})=>   //To switch windows page, need to start with context and not directly with page.
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const blinkingLink = page.locator("[href*='com/documents-request']");
    const username = page.locator('input#username');
    const password = page.locator("[id='password']");
    const signInButton = page.locator("input#signInBtn");


    //If there is a dependency where multiple steps needs to be executed simultaniously and not synchronously, then promise block is used for those commands.

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),   //Listner: listens for any new pages to open.
            blinkingLink.click()
        ]
    )

    const emailMessage = newPage.locator("[class*='red']");
    const messageText =await emailMessage.textContent();
    console.log(messageText);  //Focus on to the new page now.

    const userEmail = await messageText.split("@")[1].split(".")[0]
    console.log(userEmail);
    await newPage.close()                   //Closes the new Page

    //Back to parent window
    await page.bringToFront()       //Used to bring focus back to parent page
    await username.fill(userEmail)
    console.log("Entered value: "+await username.inputValue()) //inputValue() method fetches the user entered value from a text field.
    await password.fill("Learning@830$3mK2")
    await signInButton.click()
    


   
});


test('Direct page open',async ({page})=>  //The test.only will make sure that in this file only the tests with .only will be executed. This is useful when we want to run a specific test and ignore the other tests in the file. The page object is provided by playwright and it is used to interact with the web page. It is an instance of the Page class which is used to perform actions on the web page like click, type, navigate, etc.
{
    //If there is no need to add any cookies or proxy to your browser, there is no need to create a new browser context. You can directly use the page object provided by playwright. The page object is an instance of the Page class which is used to interact with the web page. It provides various methods to perform actions on the web page like click, type, navigate, etc.
    await page.goto("https://google.com/")
    console.log("PAGE TITLE:"+ await page.title())
    await expect(page).toHaveTitle("Google")
});