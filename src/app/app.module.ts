import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes,RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { TableComponent } from './table/table.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { FormsModule } from '@angular/forms';

const appRoute:Routes=[
 
]

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    TableComponent,
    AddTransactionComponent
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
