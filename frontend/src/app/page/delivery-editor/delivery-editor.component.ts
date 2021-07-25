import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { Location } from '@angular/common'
import { ConfigService } from 'src/app/service/config.service';
import { NgForm } from '@angular/forms';

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
    private location: Location,
    private config: ConfigService
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    if (_id !== '0') {
      const delivery = await this.deliveryService.getOne(_id).toPromise();
      this.delivery = delivery;
    }
  }

  async setDeliveryToDatabase(delivery: Delivery, form: NgForm): Promise<void> {
    if (!delivery._id) {
      const _id = this.config.objectIDGenerator();
      try {
        await this.deliveryService.create({ ...form.value, _id }).toPromise();
        this.location.back();
        this.toastr.success('Sikeresen létrehoztad a kézbesítést!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a kézbesítés létrehozásakor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    } else {
      try {
        await this.deliveryService.update(delivery).toPromise();
        this.location.back();
        this.toastr.success('Sikeresen frissítetted a kézbesítést!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a kézbesítés frissítésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  };

  backToTheDeliveryList(): void {
    this.location.back();
  }

}
