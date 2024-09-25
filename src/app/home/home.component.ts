import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map, never } from 'rxjs';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  pageNumber: number=0

  showLoadButton=false;


  productDetails:Product[]=[];

  constructor(private productService:ProductService, private imageProcessingService:ImageProcessingService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getAllProducts();
  }


  searchByKeyWord(searchKeyword: string){
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword);

  }

  public getAllProducts(searchKey:string=""){
    this.productService.getAllProducts(this.pageNumber,searchKey).pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp:Product[])=>{
        console.log(resp);
        if(resp.length==8){
          this.showLoadButton=true;
        }else{
          this.showLoadButton=false;
        }
        resp.forEach(p=>this.productDetails.push(p));
        //this.productDetails=resp;
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
      );
  }

  public LoadMoreProduct(){
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }
  showProductDetails(productId: any){
    this.router.navigate(['/productViewDetails',{productId:productId}]);
  }

  
}
