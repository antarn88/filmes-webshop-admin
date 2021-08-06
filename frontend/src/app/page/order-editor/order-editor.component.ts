import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { Location } from '@angular/common'
import { ConfigService } from 'src/app/service/config.service';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/model/customer';
import { TempService } from 'src/app/service/temp.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  order: Order = new Order();
  customers: Customer[] = [];
  currentCustomer: Customer = new Customer();
  tempProducts: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private location: Location,
    private config: ConfigService,
    public tempService: TempService
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    if (_id !== '0') {
      const order = await this.orderService.getOne(_id).toPromise();
      this.order = order;
    } else {
      this.customers = await this.customerService.getAll().toPromise();
    }
    this.tempProducts = this.tempService.getAllOrderingProducts();
  }

  async setOrderToDatabase(order: Order, form: NgForm): Promise<void> {
    if (!order._id) {
      const _id = this.config.objectIDGenerator();
      try {
        await this.orderService.create({ ...form.value, _id }).toPromise();
        this.location.back();
        this.toastr.success('Sikeresen létrehoztad a rendelést!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a rendelés létrehozásakor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    } else {
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
    }
  };

  backToTheOrderList(): void {
    this.tempService.clearTemp();
    this.location.back();
  }

  async onChangeCustomer(customerId: string): Promise<void> {
    if (customerId !== 'Válaszd ki a vásárlót') {
      this.currentCustomer = await this.customerService.getOne(customerId).toPromise();
      const emailField = document.querySelector('#email');
      if (emailField) {
        (emailField as HTMLInputElement).value = this.currentCustomer.email;
      }
    }
  }

  onClickRemoveProductFromOrder(product: Product): void {
    console.log(product);
  }

  onClickRemoveProductFromTemp(product: Product): void {
    console.log(product);
  }

}
