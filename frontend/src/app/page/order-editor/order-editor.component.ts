import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  order: Order = new Order();

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    const order = await this.orderService.getOne(_id).toPromise();
    this.order = order;
  }

  async setOrderToDatabase(order: Order): Promise<void> {
    try {
      await this.orderService.update(order).toPromise();
      this.location.back();
      this.toastr.success('Sikeresen frissítetted a rendelést!', 'Siker!', {
        timeOut: 3000,
      });
    } catch {
      this.toastr.error('Hiba a rendelés frissítésekor!', 'Hiba!', {
        timeOut: 3000,
      })
    }
  };

  backToTheOrderList(): void {
    this.location.back();
  }
}
