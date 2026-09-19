// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  reporter: 'html',
  projects: [    //Project array contains multiple set of configurations one of which can be chosen for test execution
    {
      name: 'chrome_execution',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors:true,           //bypass SSL certificate error
        permissions:['geolocation'],      //To bypass the 'want to access location' popup
        viewport: {width:720,height:720}  //Specify the dimensions you want to open the browser in

      }
    },
    {
      name: 'webkit_execution',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ...devices['Galaxy S24'] //Specify the device mobile you want the app to be tested on

      }
    },
    {
      name: 'safari_execution',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'retain-on-failure'

      }
    }
  ]



});

//To specfy the config file while running the test use "npx playwright test tests  --config playwright.configCustom.js"
//To specify the project you want to run test on use "npx playwright test tests --config playwright.configCustom.js --project=chrome_execution"
//If you don't specify the project in the run command it will execute tests same number of times as there are configs in project array.