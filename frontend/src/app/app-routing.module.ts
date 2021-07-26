import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditorComponent } from './page/admin-editor/admin-editor.component';
import { AdminsComponent } from './page/admins/admins.component';
import { BillEditorComponent } from './page/bill-editor/bill-editor.component';
import { BillsComponent } from './page/bills/bills.component';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { CustomersComponent } from './page/customers/customers.component';
import { DeliveriesComponent } from './page/deliveries/deliveries.component';
import { DeliveryEditorComponent } from './page/delivery-editor/delivery-editor.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { OrdersComponent } from './page/orders/orders.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { ProductsComponent } from './page/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:_id',
    component: ProductEditorComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/:_id',
    component: OrderEditorComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:_id',
    component: CustomerEditorComponent
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent
  },
  {
    path: 'deliveries/:_id',
    component: DeliveryEditorComponent
  },
  {
    path: 'bills',
    component: BillsComponent
  },
  {
    path: 'bills/:_id',
    component: BillEditorComponent
  },
  {
    path: 'admins',
    component: AdminsComponent
  },
  {
    path: 'admins/:_id',
    component: AdminEditorComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
