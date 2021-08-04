import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/model/admin';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Delivery } from 'src/app/model/delivery';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { AdminService } from 'src/app/service/admin.service';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];
  orderList: Order[] = [];
  customerList: Customer[] = [];
  deliveryList: Delivery[] = [];
  billList: Bill[] = [];
  adminList: Admin[] = [];

  constructor(
    public productService: ProductService,
    public orderService: OrderService,
    public customerService: CustomerService,
    public deliveryService: DeliveryService,
    public billService: BillService,
    public adminService: AdminService
  ) { }

  async ngOnInit(): Promise<void> {
    this.productList = await this.productService.getAll().toPromise();
    this.orderList = await this.orderService.getAll().toPromise();
    this.customerList = await this.customerService.getAll().toPromise();
    // this.deliveryList = await this.deliveryService.getAll().toPromise();
    this.billList = await this.billService.getAll().toPromise();
    this.adminList = await this.adminService.getAll().toPromise();
  }

}
