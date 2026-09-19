// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({ //This statement says that all the configurations are stored in a variable and that variable is marked to be exported so that it can be used throughout he project.
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries:0,  //After failure the test will be retried one more time
  workers:4,  //This will assign the number of files to be executed parallely
  timeout: 30 * 1000,  //This is global timeout for each test. If the test takes longer than this time, it will be marked as failed.  
  expect: {
    timeout: 5 * 1000  //This is the timeout for each expect statement. If the expect statement takes longer than this time, it will be marked as failed.
  },
  reporter: 'html',  //This is the reporter that will be used to generate the test report. It can be html, json, junit or list.
  use: {
   browserName: 'chromium',  //This is the browser that will be used to run the tests. It can be chromium, firefox or webkit.
   headless : false,           //Setting the headless mode explicitly Trye/False
   screenshot : 'on',   //on,off,only-on-failure
   video : 'off',     //on,off,retain-on-failure,on-first-retry
   trace : 'retain-on-failure'  //off,on,retain-on-failure options
  
  //  actionTimeout: 10*1000, //When an action is performed on the element, this is the max ime it'll wait, instead of the complete 30sec
  //  navigationTimeout: 30*1000  //The timeout to navigate to load a page used in goto method

    
  }

});



//Playwright by default runs the tests in headless mode. If needed in head mode, need to specify in run command. npx playwright test --headed
//tests present in the single file gets executed sequesncially.
//multiple test files gets executed in parallel. If needed to run in sequencial manner, need to specify in run command.