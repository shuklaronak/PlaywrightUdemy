export class APIUtils
{    
    apiContext : any
    loginPayload : string

    constructor(apiContext:any, loginPayload:string)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",  //POST API call
                {
                    data:this.loginPayload
                }) //creds in it
         
        const jsonResponse = await loginResponse.json()
        
        let accessToken = jsonResponse.token;  //extracted from response
        console.log(accessToken)
        return accessToken;
    }

    async createOrder(orderPayload:string)
    {
        let response = {token:String, orderID:String}
        response.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data : orderPayload,
            headers : {
                'Authorization' : response.token,
                'Content-Type' : 'application/json'
            }

        });

        const orderResonseJson = await createOrderResponse.json();
        let orderID = orderResonseJson.orders[0];
        console.log("API Order: "+orderID);
        response.orderID = await orderID
        
        return response;
    }

}

module.exports = {APIUtils};