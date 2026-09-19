const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { CartPage } = require('./CartPage')
const { PaymentPage } = require('./PaymentPage')
const { OrderConfirmationPage } = require('./OrderConfirmationPage')
const { MyOrdersPage } = require('./MyOrdersPage')
const { OrderSummaryPage } = require('./OrderSummaryPage')


class PO_MANAGER {
    constructor(page) {
        this.login_po = new LoginPage(page);
        this.dashboard_po = new DashboardPage(page);
        this.cart_po = new CartPage(page);
        this.payment_po = new PaymentPage(page);
        this.orderConfirm_po = new OrderConfirmationPage(page);
        this.myorder_po = new MyOrdersPage(page);
        this.ordersummary_po = new OrderSummaryPage(page);
    }

    getLoginPage() {
        return this.login_po;
    }

    getDashboardPage() {
        return this.dashboard_po;
    }

    getCartPage() {
        return this.cart_po;
    }

    getPaymentPage() {
        return this.payment_po;
    }

    getOrderConfirmationPage() {
        return this.orderConfirm_po;
    }

    getMyOrderPage() {
        return this.myorder_po;
    }

    getOrderSummaryPage() {
        return this.ordersummary_po;
    }


}

module.exports = { PO_MANAGER }