import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditFournisseurcomponentComponent } from './add-edit-fournisseurcomponent/add-edit-fournisseurcomponent.component';
import {NgLetModule} from "ng-let";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ShowOnefournisseurComponentComponent} from "./show-onefournisseur-component/show-onefournisseur-component.component";
import {ListfournisseurcomponentComponent} from "./listfournisseurcomponent/listfournisseurcomponent.component";



@NgModule({
  declarations: [
    AddEditFournisseurcomponentComponent,
    ShowOnefournisseurComponentComponent,
    ListfournisseurcomponentComponent
  ],
  imports: [
    CommonModule,
    NgLetModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class FournisseurModule { }
