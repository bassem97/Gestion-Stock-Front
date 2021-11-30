import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductModule } from './modules/product/product.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent],
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
    ProductModule,
    MatIconModule,
    BrowserModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
