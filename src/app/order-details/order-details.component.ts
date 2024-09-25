import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  status: string='All';
  displayColumns:string[]=['Id','Product Name','Name','Address','Contact No.','Status','Action'];

  dataSource:MyOrderDetails[]=[];

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter:string){
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp)=>{
        this.dataSource=resp;
        console.log(resp);
      },(error)=>{
        console.log(error);
      }
      )
    
  }

  markAsDelivered(orderId:any){
    console.log(orderId);

    this.productService.markAsDelivered(orderId).subscribe(
      (resp)=>{
        console.log(resp);
        this.getAllOrderDetailsForAdmin(this.status);
      },(error)=>{
        console.log(error);
      }
    )
  }

}
