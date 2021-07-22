import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/model/delivery';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Delivery[]> = this.deliveryService.getAll();

  constructor(
    public config: ConfigService,
    public deliveryService: DeliveryService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.deliveryColumns;
  }

  // tslint:disable-next-line: no-empty
  onClickEdit(delivery: Delivery): void {
  }

  // tslint:disable-next-line: no-empty
  onClickDelete(delivery: Delivery): void {
  }

}
