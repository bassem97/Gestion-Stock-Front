import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FournisseurModule} from "./fournisseur/fournisseur.module";
import {StockModule} from "./stock/stock.module";
import {ProductModule} from "./product/product.module";
import {ReclamationModule} from "./reclamation/reclamation.module";
import { FacturesModule } from './factures/factures.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRegistrationModule } from './login-registration/login-registration.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FournisseurModule,
    ReactiveFormsModule,
    LoginRegistrationModule,
    FournisseurModule,
    FacturesModule,
    StockModule,
    ProductModule,
    ReclamationModule
  ]
})
export class ModulesModule { }
