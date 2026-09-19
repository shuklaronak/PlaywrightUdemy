const base = require('@playwright/test');

exports.customtest = base.test.extend(

    {
        testDataForOrder:
        {
            "email": "johndoe04@gmail.com",
            "pswd": "Learning123@",
            "prodName": "ADIDAS ORIGINAL",
            "country": "Cuba"
        }

    }
)