import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { XPipePipe } from './pipe/x-pipe.pipe';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { AdminEditorComponent } from './page/admin-editor/admin-editor.component';
import { BillEditorComponent } from './page/bill-editor/bill-editor.component';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { DeliveryEditorComponent } from './page/delivery-editor/delivery-editor.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { FooterComponent } from './widget/footer/footer.component';
import { ModalComponent } from './widget/modal/modal.component';
import { ProductChooserComponent } from './widget/product-chooser/product-chooser.component';
import { ForgottenPasswordComponent } from './page/forgotten-password/forgotten-password.component';

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
    XPipePipe,
    ProductEditorComponent,
    AdminEditorComponent,
    BillEditorComponent,
    CustomerEditorComponent,
    DeliveryEditorComponent,
    OrderEditorComponent,
    ForbiddenComponent,
    FooterComponent,
    ModalComponent,
    ProductChooserComponent,
    ForgottenPasswordComponent,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
