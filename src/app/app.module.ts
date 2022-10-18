import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { PinataService } from './pinata.service';
import { Web3Component } from './web3/web3.component';

@NgModule({
  declarations: [
    AppComponent,
    Web3Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [PinataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
