import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';
import { ToastrService } from 'ngx-toastr';
import { BillService } from 'src/app/service/bill.service';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Order[]> = new Observable();
  modalTitle: string = '';
  modalText: string = '';
  currentOrderForDelete: Order = new Order();

  constructor(
    public config: ConfigService,
    public orderService: OrderService,
    private billService: BillService,
    private deliveryService: DeliveryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.list$ = new Observable();
    this.list$ = this.orderService.getAll();
    this.tableColumns = this.config.orderColumns;
  }

  async deleteOrderAction(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
        await this.orderService.delete(this.currentOrderForDelete._id).toPromise();
        // await this.billService.delete(this.currentOrderForDelete.bill._id).toPromise();
        // await this.deliveryService.delete(this.currentOrderForDelete.bill._id).toPromise();
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

  async onClickDelete(order: Order): Promise<void> {
    this.modalTitle = 'Törlés';
    this.modalText = `Biztosan törölni szeretnéd a rendelést minden hozzátartozó adatával együtt?`;
    this.currentOrderForDelete = order;
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
