import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FactureComponent } from './facture/facture.component';
import {MatIconModule} from "@angular/material/icon";
import { AddFactureComponent } from './add-facture/add-facture.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    ListComponent,
    FactureComponent,
    AddFactureComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule
  ]
})
export class FacturesModule { }
