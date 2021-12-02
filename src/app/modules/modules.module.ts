import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FournisseurModule} from "./fournisseur/fournisseur.module";
import {StockModule} from "./stock/stock.module";
import {ProductModule} from "./product/product.module";
import {ReclamationModule} from "./reclamation/reclamation.module";



@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    FournisseurModule,
    StockModule,
    ProductModule,
    ReclamationModule
  ]
})
export class ModulesModule { }
