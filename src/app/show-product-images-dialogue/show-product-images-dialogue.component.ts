import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FileHandle } from '../_model/File-handle.model';

@Component({
  selector: 'app-show-product-images-dialogue',
  templateUrl: './show-product-images-dialogue.component.html',
  styleUrls: ['./show-product-images-dialogue.component.css']
})
export class ShowProductImagesDialogueComponent implements OnInit {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
 
 
  ngOnInit(): void {
    this.recieveImages;
  }

  recieveImages(){
    console.log(this.data);
  }

}
