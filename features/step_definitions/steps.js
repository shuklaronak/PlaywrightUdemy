const { When, Then, Given } = require('@cucumber/cucumber')
const { PO_MANAGER } = require('../../pageObjects/PO_MANAGER')

Given('Page is loaded and logged in using {string} and {string}', {timeout: 30000}, async function (username, password) {

    const login_po = this.manager_po.getLoginPage();

    await login_po.launchLoginPage();
    await login_po.validLogin(username, password);
    console.log("User is: "+username)

});

When('Add {string} to cart', async function (prodName) {

    const dashboard_po = this.manager_po.getDashboardPage();

    await dashboard_po.addProductToCart(prodName);
    await dashboard_po.navigateToCart();

});

Then('Verify {string} is present in cart', async function (prodName) {

    const cart_po = this.manager_po.getCartPage();

    await cart_po.verifyProductInCart(prodName);
    await cart_po.checkoutCart();
});

When('Enter details to place order for {string} with email {string}', async function (country, email) {

    const payment_po = this.manager_po.getPaymentPage();

    await payment_po.fillPaymentDetails(country, email);
    await payment_po.placeTheOrder();

});

Then('Verify order is pressent in orderHistory', async function () {

    const orderConfirm_po = this.manager_po.getOrderConfirmationPage();
    const myorder_po = this.manager_po.getMyOrderPage();
    const ordersummary_po = this.manager_po.getOrderSummaryPage();

    await orderConfirm_po.verifyConfirmationMessage();
    const orderID = await orderConfirm_po.getOrderID();
    await orderConfirm_po.gotoMyOrders();
    await myorder_po.gotoOrderSummary(orderID);
    await ordersummary_po.verifyOrderSummary(orderID);
});