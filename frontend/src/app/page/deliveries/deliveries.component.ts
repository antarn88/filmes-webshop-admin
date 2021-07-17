import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {
  
  deliveries$: Observable<Delivery[]> = this.deliveryService.getAll();

  constructor(
    private deliveryService: DeliveryService,
  ) { }

  ngOnInit(): void {
  }

}
