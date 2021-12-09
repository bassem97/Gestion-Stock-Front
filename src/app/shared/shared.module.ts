import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { DeleteDialogStockComponent } from './dialogs/delete-dialog-stock/delete-dialog-stock.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DeleteDialogComponent,
    DeleteDialogStockComponent,
    ErrorDialogComponent,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        MatButtonModule,
        MatTooltipModule,

    ]
})
export class SharedModule { }
