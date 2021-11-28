import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {AppRoutingModule} from "./app.routing";
import {SharedModule} from "./shared/shared.module";
import {ModulesModule} from "./modules/modules.module";
import { ProduitComponent } from './produit/produit.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ListProductComponent } from './list-product/list-product.component';
import {ProductModule} from "./modules/product/product.module";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProduitComponent,
    ListProductComponent,
  ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        SharedModule,
        ModulesModule,
        MatCardModule,
        MatButtonModule,
        ProductModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
