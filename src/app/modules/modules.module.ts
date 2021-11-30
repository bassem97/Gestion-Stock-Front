import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurModule } from './fournisseur/fournisseur.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRegistrationModule } from './login-registration/login-registration.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FournisseurModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRegistrationModule,
   
  
  ],
})
export class ModulesModule {}
