
import { test } from '@playwright/test'
import { customtest } from '../testData_TS/testdataFixture'
import { PO_MANAGER } from '../pageObjects_TS/PO_MANAGER'

//To collect JSON testdata. conversion flow JSON->String->Javascript Object
const dataset = JSON.parse(JSON.stringify(require('../testData_TS/placeorderTestdata.json')));

//To run TC multiple times with different data, use dataset as an array and put test in a for loop.
for(const data of dataset)
{

test(`Page object client app test data through JSON file ${data.email}`, async ({ page }) => {   //To add testdata in test case description use ` and ${}
    const email = data.email;
    const pswd = data.pswd;
    const prodName = data.prodName;
    const country = data.country;

    const manager_po = new PO_MANAGER(page); //Using Page Object Manager class to import all the page object classes, instead of importing all of then here.

    const login_po = manager_po.getLoginPage();
    const dashboard_po = manager_po.getDashboardPage();
    const cart_po = manager_po.getCartPage();
    const payment_po = manager_po.getPaymentPage();
    const orderConfirm_po = manager_po.getOrderConfirmationPage();
    const myorder_po = manager_po.getMyOrderPage();
    const ordersummary_po = manager_po.getOrderSummaryPage();


    await login_po.launchLoginPage();
    await login_po.validLogin(email, pswd);

    await dashboard_po.addProductToCart(prodName);
    await dashboard_po.navigateToCart();

    await cart_po.verifyProductInCart(prodName);
    await cart_po.checkoutCart();

    await payment_po.fillPaymentDetails(country, email);
    await payment_po.placeTheOrder();

    await orderConfirm_po.verifyConfirmationMessage();
    const orderID:any = await orderConfirm_po.getOrderID();
    await orderConfirm_po.gotoMyOrders();

    await myorder_po.gotoOrderSummary(orderID);

    await ordersummary_po.verifyOrderSummary(orderID);

})
}

customtest('Page object client app using test data from fixture', async ({ page,testDataForOrder }) => {
    const email = testDataForOrder.email;
    const pswd = testDataForOrder.pswd;
    const prodName = testDataForOrder.prodName;
    const country = testDataForOrder.country;

    const manager_po = new PO_MANAGER(page); //Using Page Object Manager class to import all the page object classes, instead of importing all of then here.

    const login_po = manager_po.getLoginPage();
    const dashboard_po = manager_po.getDashboardPage();
    const cart_po = manager_po.getCartPage();
    const payment_po = manager_po.getPaymentPage();
    const orderConfirm_po = manager_po.getOrderConfirmationPage();
    const myorder_po = manager_po.getMyOrderPage();
    const ordersummary_po = manager_po.getOrderSummaryPage();


    await login_po.launchLoginPage();
    await login_po.validLogin(email, pswd);

    await dashboard_po.addProductToCart(prodName);
    await dashboard_po.navigateToCart();

    await cart_po.verifyProductInCart(prodName);
    await cart_po.checkoutCart();

})


