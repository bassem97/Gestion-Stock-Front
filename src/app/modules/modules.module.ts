import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {StockModule} from "./stock/stock.module";
import {ProductModule} from "./product/product.module";
import {ReclamationModule} from "./reclamation/reclamation.module";
import { FacturesModule } from './factures/factures.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRegistrationModule } from './login-registration/login-registration.module';
import {RayonModule} from "./rayon/rayon.module";
import {FournisseurModule} from "./fournisseur/fournisseur.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRegistrationModule,
    FournisseurModule,
    RayonModule,
    FacturesModule,
    StockModule,
    ProductModule,
    ReclamationModule
  ]
})
export class ModulesModule { }
