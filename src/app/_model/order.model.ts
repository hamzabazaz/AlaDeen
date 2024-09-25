import { Product } from "./product.model";

export interface MyOrderDetails{
    orderId:number;
    orderFullName:String;
    orderFullOrder:String;
    orderContactNumber:String;
    orderAlternateContactNumber:String;
    orderStatus:String;
    orderAmount:number;
    product:Product;
    user:any;
}