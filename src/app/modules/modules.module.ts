import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FournisseurModule} from "./fournisseur/fournisseur.module";
import {StockModule} from "./stock/stock.module";
import {ProductModule} from "./product/product.module";
import {ReclamationModule} from "./reclamation/reclamation.module";
import { FacturesModule } from './factures/factures.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FournisseurModule,
    FacturesModule,
    StockModule,
    ProductModule,
    ReclamationModule
  ]
})
export class ModulesModule { }
