import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { Customer } from 'src/app/model/customer';
import { TempService } from 'src/app/service/temp.service';
import { Product } from 'src/app/model/product';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Delivery } from 'src/app/model/delivery';
import { BillService } from 'src/app/service/bill.service';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {

  order: Order = new Order();
  newBill: Bill = new Bill();
  newDelivery: Delivery = new Delivery();
  customers: Customer[] = [];
  currentCustomer: Customer = new Customer();
  tempProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  totalSum$: BehaviorSubject<number> = this.tempService.currentSum;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private customerService: CustomerService,
    private billService: BillService,
    private deliveryService: DeliveryService,
    private toastr: ToastrService,
    public tempService: TempService
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    if (_id !== '0') {
      const order = await this.orderService.getOne(_id).toPromise();
      this.order = order;
    } else {
      this.totalSum$.next(0);
      this.customers = await this.customerService.getAll().toPromise();
    }
    this.tempProducts = this.tempService.orderingProducts;
  }

  async setOrderToDatabase(order: Order, form: NgForm): Promise<void> {
    if (!order._id) {
      try {
        await this.setOrderToDatabaseAtNewOrder();
        this.backToTheOrderList();
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
        await this.setOrderToDatabaseAtExistingOrder();
        this.backToTheOrderList();
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
    this.totalSum$.next(0);
    history.back();
  }

  async onChangeCustomer(customerId: string): Promise<void> {
    const emailField = document.querySelector('#email');
    if (customerId !== 'Válaszd ki a vásárlót') {
      this.currentCustomer = await this.customerService.getOne(customerId).toPromise();
      (emailField as HTMLInputElement).value = this.currentCustomer.email;
    } else {
      (emailField as HTMLInputElement).value = '';
    }
  }

  onClickRemoveProductFromOrder(product: Product): void {
    const productIndex = this.order.products.findIndex(p => product._id === p._id);
    this.order.products.splice(productIndex, 1);
    this.order.bill.sum -= product.price;
  }

  onClickRemoveProductFromTemp(product: Product): void {
    this.tempService.delProductFromOrderList(product).subscribe(() => { });
  }

  getFullName(customer: Customer): string {
    return `${customer.lastName} ${customer.firstName}`;
  }

  async setOrderToDatabaseAtNewOrder(): Promise<void> {
    const products = [...this.order.products, ...this.tempProducts.getValue()];
    const note = this.order.note;
    const customer = this.currentCustomer;
    const sum = Number(document.querySelector('#sum')?.textContent);
    const paid = this.order.bill.paid;

    const newBill = { _id: '0', products, customer, sum, paid };
    const newBillObject = await this.billService.create(newBill).toPromise();
    const newOrder = { _id: '0', products, note, customer, bill: newBillObject };
    const newOrderFromDatabase = await this.orderService.create(newOrder).toPromise();
    const newDelivery = { _id: '0', products, customer, note, order: newOrderFromDatabase._id };
    await this.deliveryService.create(newDelivery).toPromise();
  }

  async setOrderToDatabaseAtExistingOrder(): Promise<void> {
    const orderId = this.order._id;
    const billId = this.order.bill._id;
    const products = [...this.order.products, ...this.tempProducts.getValue()];
    const note = this.order.note;
    const customer = this.order.customer;
    const sum = Number(document.querySelector('#sum')?.textContent);
    const paid = this.order.bill.paid;

    const billForUpdate = { _id: billId, customer, products, sum, paid };
    await this.billService.update(billForUpdate).toPromise();
    const orderForUpdate = { _id: orderId, customer, bill: billForUpdate, products, note };
    await this.orderService.update(orderForUpdate).toPromise();
  }

  validateForm(): boolean {
    const hasProducts = this.tempProducts.getValue().length > 0 || this.order.products.length > 0;
    const hasNote = this.order.note.length > 0;
    if (!this.order._id) {
      const hasCustomer = (document.querySelector('#customer-select') as HTMLInputElement).value !== 'Válaszd ki a vásárlót';
      return hasProducts && hasCustomer && hasNote;
    } else {
      return hasProducts && hasNote;
    }
  }

}
