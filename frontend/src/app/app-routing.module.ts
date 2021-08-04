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
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'products/:_id',
    component: ProductEditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders/:_id',
    component: OrderEditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'customers/:_id',
    component: CustomerEditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'deliveries/:_id',
    component: DeliveryEditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bills',
    component: BillsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bills/:_id',
    component: BillEditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admins/:_id',
    component: AdminEditorComponent,
    canActivate: [AuthGuardService],
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
