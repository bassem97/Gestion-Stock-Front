import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowOnerayonComponent} from "./show-onerayon/show-onerayon.component";
import {AddEditRayonComponent} from "./add-edit-rayon/add-edit-rayon.component";
import {ListrayonComponent} from "./listrayon/listrayon.component";
import {NgLetModule} from "ng-let";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ShowOnerayonComponent,
    AddEditRayonComponent,
    ListrayonComponent,
  ],
  imports: [
    CommonModule,
    NgLetModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RayonModule { }
