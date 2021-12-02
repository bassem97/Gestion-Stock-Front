import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FournisseurModule} from "./fournisseur/fournisseur.module";
import { FacturesModule } from './factures/factures.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FournisseurModule,
    FacturesModule
  ]
})
export class ModulesModule { }
