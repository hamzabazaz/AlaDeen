import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { filter } from 'rxjs';



declare var Razorpay:any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout:any;

  productDetails:Product[]=[];


  orderDetails:OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId:'',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router,
    private injector:Injector
  ){}


  ngOnInit(): void {
    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];

    this.isSingleProductCheckout=this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm:NgForm){

    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
        const ngZone=this.injector.get(NgZone);
        ngZone.run(
          ()=>{
            this.router.navigate(['/orderConfirm']);
          }
        );
       
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  getQuantityForProduct(productId: any){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId
    );
    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: any,productDiscountedPrice: any){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId
    );
    return filteredProduct[0].quantity*productDiscountedPrice;
  }

  onQuantityChanged(q: any,productId: any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId===productId
    )[0].quantity=q;
  }

  getClaculatedGrandTotal(){
    let grandTotal=0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price=this.productDetails.filter(product=>product.productId===productQuantity.productId)[0].productDiscountedPrice;
        grandTotal=grandTotal+price*productQuantity.quantity;
       
      }
    );
    return grandTotal;
  }

  createTransactionAndPlaceOrder(orderForm:NgForm){
    let amount=this.getClaculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (resp)=>{
        console.log(resp); 
        this.openTransactionModel(resp,orderForm);    
      },(error)=>{
        console.log(error);
        
      }
    )
  }

  openTransactionModel(response:any, orderForm:NgForm){
    var options= {
      order_id:response.orderId,
      key: response.key,
      amount:response.amount,
      currency:response.currency,
      name:'Alladeen',
      description:'Payment of online shopping',
      image:"https://media.istockphoto.com/id/1323846766/photo/a-beautiful-view-of-dal-lake-in-winter-srinagar-kashmir-india.jpg?s=612x612&w=0&k=20&c=Dp3peie2t-jdLEmqe4W-DD09GACu2Cr-JjHHeB6rpBc=",
      handler:(response:any)=>{
        if(response!=null && response.razorpay_payment_id !=null ){
          this.processResponse(response,orderForm);
        }else{
          alert("Payment failed..");
        }
        
      },
      prefill:{
        name:'ALD',
        email:'hamza.bazaz7@gmail.com',
        contact:'7006863795',
      },
      notes:{
        address:'Online Shopping'
      },
      theme:{
        color:'#F3724'
      }

    };
    var razorPayObject=new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp:any,orderForm:NgForm){
    this.orderDetails.transactionId=resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}
