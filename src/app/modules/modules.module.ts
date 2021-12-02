import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FournisseurModule} from "./fournisseur/fournisseur.module";
import {RayonModule} from "./rayon/rayon.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FournisseurModule,
    RayonModule
  ]
})
export class ModulesModule { }
