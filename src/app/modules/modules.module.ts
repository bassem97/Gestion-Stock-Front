import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FournisseurModule} from "./fournisseur/fournisseur.module";
import {StockModule} from "./stock/stock.module";



@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    FournisseurModule,
    StockModule
  ]
})
export class ModulesModule { }
