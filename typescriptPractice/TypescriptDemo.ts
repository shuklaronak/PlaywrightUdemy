import { Locator, Page } from "@playwright/test";

let message1 : string = "Hello World";

let age1 : number = 20;

let flag1 : boolean = true;

let numarr1 : number[] = [1,2,3]

let data1 : any = "this could be any datatype";
    data1 = 56;

//function
function add(a:number,b:number) : number
{
    return a+b;
}

//object
let user : {name:string, age:number} = {name:"Ronak", age:30}

console.log(message1)

//
export class CartPage
{
    page : Page
    checkout : Locator
    cartProduct : Locator
    paymentPageLable : Locator

    constructor(page : Page)
    {
        this.page = page;

        this.checkout = this.page.locator("button[type=button]").nth(1);
        this.cartProduct = this.page.locator(".cartSection h3");
        this.paymentPageLable = this.page.getByText(" Payment Method ");
    }
}

