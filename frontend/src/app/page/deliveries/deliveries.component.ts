import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/model/delivery';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  tableColumns: ITableColumn[] = [];
  list$: Observable<Delivery[]> = this.deliveryService.getAll();
  modalTitle: string = '';
  modalText: string = '';
  currentDeliveryForDelete: Delivery = new Delivery();

  constructor(
    public config: ConfigService,
    public deliveryService: DeliveryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.tableColumns = this.config.deliveryColumns;
  }

  async deleteDeliveryAction(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
        await this.deliveryService.delete(this.currentDeliveryForDelete._id).toPromise();
        this.list$ = this.deliveryService.getAll();
        this.toastr.success('Sikeresen törölted a kiszállítást!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a kiszállítás törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  }

  async onClickDelete(delivery: Delivery): Promise<void> {
    this.modalTitle = 'Törlés';
    this.modalText = `Biztosan törölni szeretnéd a kiszállítást?`;
    this.currentDeliveryForDelete = delivery;
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

}
