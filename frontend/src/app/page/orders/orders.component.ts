import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]> = this.orderService.getAll();

  constructor(
    public orderService: OrderService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

}
