import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { DataTableComponent } from './widget/data-table/data-table.component';
import { IdTransformPipe } from './pipe/id-transform.pipe';
import { XPipePipe } from './pipe/x-pipe.pipe';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { AdminEditorComponent } from './page/admin-editor/admin-editor.component';
import { BillEditorComponent } from './page/bill-editor/bill-editor.component';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { DeliveryEditorComponent } from './page/delivery-editor/delivery-editor.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';

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
    DataTableComponent,
    IdTransformPipe,
    XPipePipe,
    ProductEditorComponent,
    AdminEditorComponent,
    BillEditorComponent,
    CustomerEditorComponent,
    DeliveryEditorComponent,
    OrderEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
