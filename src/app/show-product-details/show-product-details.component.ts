import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogueComponent } from '../show-product-images-dialogue/show-product-images-dialogue.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {


  showLoadMoreProductButton=false;

  showTable=false;

  pageNumber:number=0;
  productDetails: Product[]=[];

  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price','Product Actual Price','Actions'];

  constructor(private productService: ProductService, public imagesDialog: MatDialog,
    private imageProcessingService:ImageProcessingService,
    private router:Router
  ){}


  ngOnInit(): void {
    this.getAllProducts();
  }
  searchByKeyWord(searchKeyword:string){
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword);

  }

  public getAllProducts(searchKeyword:string=""){
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber,searchKeyword).pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp:Product[])=>{
        console.log(resp);
        resp.forEach(product=>this.productDetails.push(product));
        this.showTable=true;
        if(resp.length==8){
          this.showLoadMoreProductButton=true;
        }else{
          this.showLoadMoreProductButton=false;
        }
            },(error:HttpErrorResponse)=>{
        console.log(error);
      }
      );
  }

  deleteProduct(productId: any){

    this.productService.deleteProduct(productId).subscribe(
      (resp)=>{
        this.getAllProducts();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }
showImages(product:Product){

  console.log(product);
  this.imagesDialog.open(ShowProductImagesDialogueComponent,{
    data:{
      images:product.productImages
    },
    
    height:'500px',
    width: '1000px'

  });
}

editProductDetails(productId: any){
  this.router.navigate(['/addNewProduct',{productId: productId}]);
}

loadMoreProduct(){
  this.pageNumber=this.pageNumber+1;
  this.getAllProducts();
}
}
