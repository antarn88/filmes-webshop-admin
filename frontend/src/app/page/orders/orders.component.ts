import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Order[]> = this.orderService.getAll();

  constructor(
    public config: ConfigService,
    public orderService: OrderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.orderColumns;
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(order: Order): void {
  }

  async onClickDelete(order: Order): Promise<void> {
    if (confirm(`Biztosan törölni szeretnéd a rendelést?`)) {
      try {
        await this.orderService.delete(order._id).toPromise();
        this.list$ = this.orderService.getAll();
        this.toastr.success('Sikeresen törölted a rendelést!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a rendelés törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  }

  onClickListView(): void {
    this.config.view = 'list'
  }

  onClickGridView(): void {
    this.config.view = 'grid';
  }

  onScroll(): void {
    this.config.endItem += this.config.scrollSize;
  }

  activeOrInactiveSign(value: boolean): string {
    return `Státusz: ${ConfigService.activeOrInactiveSign(value)}`;
  }
}
