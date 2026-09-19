import {test as basetest} from '@playwright/test'

interface TestDataForOrder {
    email: string;
    pswd: string;
    prodName: string;
    country: string;
}
export const customtest = basetest.extend<{testDataForOrder:TestDataForOrder}>(

    {
        testDataForOrder:
        {
            email: "johndoe04@gmail.com",
            pswd: "Learning123@",
            prodName: "ADIDAS ORIGINAL",
            country: "Cuba"
        }

    }
)