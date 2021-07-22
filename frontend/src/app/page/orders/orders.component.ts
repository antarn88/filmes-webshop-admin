import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Order[]> = this.orderService.getAll();
  view: string = 'grid';

  constructor(
    public config: ConfigService,
    public orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.orderColumns;
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(order: Order): void {
  }

  // tslint:disable-next-line: no-empty
  onClickDelete(order: Order): void {
  }

  onClickListView(): void {
    this.view = 'list'
    this.config.startItem = 0;
    this.config.endItem = 30;
  }

  onClickGridView(): void {
    this.view = 'grid';
    this.config.startItem = 0;
    this.config.endItem = 30;
  }

  onScroll(): void {
    this.config.endItem += this.config.scrollSize;
  }

  activeOrInactiveSign(value: boolean): string {
    return `Státusz: ${ConfigService.activeOrInactiveSign(value)}`;
  }
}
