import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { NavComponent } from './widget/nav/nav.component';
import { LoginComponent } from './page/login/login.component';
import { ProductsComponent } from './page/products/products.component';
import { OrdersComponent } from './page/orders/orders.component';
import { CustomersComponent } from './page/customers/customers.component';
import { DeliveriesComponent } from './page/deliveries/deliveries.component';
import { BillsComponent } from './page/bills/bills.component';
import { AdminsComponent } from './page/admins/admins.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    ProductsComponent,
    OrdersComponent,
    CustomersComponent,
    DeliveriesComponent,
    BillsComponent,
    AdminsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
