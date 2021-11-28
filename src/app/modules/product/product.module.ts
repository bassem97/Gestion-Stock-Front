import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ListProductComponent} from "./list-product/list-product.component";
import {ProductComponent} from "./product/product.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    AddProductComponent,
    ListProductComponent,
    ProductComponent
  ],
  exports: [
    AddProductComponent,
    ListProductComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProductModule { }
