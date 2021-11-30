import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock/stock/stock.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    StockComponent
  ],
  exports: [
    StockComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ModulesModule { }
