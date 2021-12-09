import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockComponent} from "./stock/stock.component";
import {ListStockComponent} from "./list-stock/list-stock.component";
import {AddStockComponent} from "./add-stock/add-stock.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


// @ts-ignore
@NgModule({
  declarations: [
    ListStockComponent,
    AddStockComponent,
    StockComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]

})
export class StockModule { }
