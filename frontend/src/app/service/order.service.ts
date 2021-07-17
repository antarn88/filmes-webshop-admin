import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { BaseService } from './base.service';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> implements OnInit {

  constructor(
    public http: HttpClient,
    private customerService: CustomerService,
    private billService: BillService,
    private productService: ProductService,
  ) {
    super(http);
    this.entity = 'orders';
  }
  ngOnInit(): void {
  }

}
