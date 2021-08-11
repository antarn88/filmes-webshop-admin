import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  deleteByOrderId(orderId: string): Observable<Delivery> {
    const url = `${this.apiUrl}/${this.entity}/orderId=${orderId}`;
    return this.http.delete<Delivery>(url);
  }
}
