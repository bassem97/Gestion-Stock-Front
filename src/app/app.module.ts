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
import { AddEditProviderComponentComponent } from './Fournisseur/add-edit-provider-component/add-edit-provider-component.component';
import { ShowOneProviderComponentComponent } from './Fournisseur/show-one-provider-component/show-one-provider-component.component';
import { ListProviderComponentComponent } from './Fournisseur/list-provider-component/list-provider-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddEditProviderComponentComponent,
    ShowOneProviderComponentComponent,
    ListProviderComponentComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    ModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
