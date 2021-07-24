import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-delivery-editor',
  templateUrl: './delivery-editor.component.html',
  styleUrls: ['./delivery-editor.component.scss']
})
export class DeliveryEditorComponent implements OnInit {

  delivery: Delivery = new Delivery();

  constructor(
    private activatedRoute: ActivatedRoute,
    private deliveryService: DeliveryService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    const delivery = await this.deliveryService.getOne(_id).toPromise();
    this.delivery = delivery;
  }

  async setDeliveryToDatabase(delivery: Delivery): Promise<void> {
    try {
      await this.deliveryService.update(delivery).toPromise();
      this.location.back();
      this.toastr.success('Sikeresen frissítetted a kiszállítást!', 'Siker!', {
        timeOut: 3000,
      });
    } catch {
      this.toastr.error('Hiba a kiszállítás frissítésekor!', 'Hiba!', {
        timeOut: 3000,
      })
    }
  };

  backToTheDeliveryList(): void {
    this.location.back();
  }

}
