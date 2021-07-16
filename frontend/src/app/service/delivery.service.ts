import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../model/delivery';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService extends BaseService<Delivery> {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
    this.entity = 'deliveries';
  }
}
