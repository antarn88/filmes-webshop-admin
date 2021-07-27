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
import { RoleGuardService } from './service/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'products/:_id',
    component: ProductEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'orders/:_id',
    component: OrderEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'customers/:_id',
    component: CustomerEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'deliveries/:_id',
    component: DeliveryEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'bills',
    component: BillsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'bills/:_id',
    component: BillEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'admins/:_id',
    component: AdminEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
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
