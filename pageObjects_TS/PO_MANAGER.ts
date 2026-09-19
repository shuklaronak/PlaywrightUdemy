import { Page } from '@playwright/test'

import { LoginPage } from '../pageObjects_TS/LoginPage'
import { DashboardPage } from '../pageObjects_TS/DashboardPage'
import { CartPage } from '../pageObjects_TS/CartPage'
import { PaymentPage } from '../pageObjects_TS/PaymentPage'
import { OrderConfirmationPage } from '../pageObjects_TS/OrderConfirmationPage'
import { MyOrdersPage } from '../pageObjects_TS/MyOrdersPage'
import { OrderSummaryPage } from '../pageObjects_TS/OrderSummaryPage'


export class PO_MANAGER {

    login_po : LoginPage;
    dashboard_po : DashboardPage;
    cart_po : CartPage;
    payment_po : PaymentPage
    orderConfirm_po : OrderConfirmationPage
    myorder_po : MyOrdersPage
    ordersummary_po : OrderSummaryPage

    constructor(page : Page) {
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