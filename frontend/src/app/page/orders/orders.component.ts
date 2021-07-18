import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]> = this.orderService.getAll();
  customers: Customer[] = [];
  products: Product[] = [];
  bills: Bill[] = [];

  constructor(
    public orderService: OrderService,
    public customerService: CustomerService,
    public productService: ProductService,
    public billService: BillService
  ) { }

  async ngOnInit(): Promise<void> {
    this.customers = await this.customerService.getAll().toPromise();
    this.products = await this.productService.getAll().toPromise();
    this.bills = await this.billService.getAll().toPromise();
  }

  customerIdToCustomer(customerID: string): Customer {
    return this.customers.find(customer => customer._id === customerID) || new Customer();
  }

  productIdToProduct(productID: string): Product {
    return this.products.find(product => product._id === productID) || new Product();
  }

  billIdToBill(billID: string): Bill {
    return this.bills.find(bill => bill._id === billID) || new Bill();
  }
}
