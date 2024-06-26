import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { SubTicketComponent } from './pages/sub-ticket/sub-ticket.component';
import { BatchDetailsComponent } from './pages/batch-details/batch-details.component';
import { CardServiceComponent } from './service/card-service/card-service.component';
import { EmailServiceComponent } from './service/email-service/email-service.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { CcClassComponent } from './pages/cc-class/cc-class.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    SubTicketComponent,
    BatchDetailsComponent,

    CardServiceComponent,
      EmailServiceComponent,
      ClassDetailsComponent,
      CcClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
