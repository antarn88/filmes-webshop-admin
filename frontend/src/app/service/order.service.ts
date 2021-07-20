import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> implements OnInit {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
    this.entity = 'orders';
  }
  ngOnInit(): void {
  }

}
