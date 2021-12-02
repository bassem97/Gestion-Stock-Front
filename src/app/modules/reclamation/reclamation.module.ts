import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListReclamationsComponent} from "./list-reclamations/list-reclamations.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    ListReclamationsComponent,
    AddReclamationComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class ReclamationModule { }
