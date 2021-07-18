import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Delivery } from 'src/app/model/delivery';
import { Product } from 'src/app/model/product';
import { CustomerService } from 'src/app/service/customer.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  deliveries$: Observable<Delivery[]> = this.deliveryService.getAll();
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private deliveryService: DeliveryService,
    public customerService: CustomerService,
    public productService: ProductService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.customers = await this.customerService.getAll().toPromise();
    this.products = await this.productService.getAll().toPromise();
  }

  customerIdToCustomer(customerID: string): Customer {
    return this.customers.find(customer => customer._id === customerID) || new Customer();
  }

  productIdToProduct(productID: string): Product {
    return this.products.find(product => product._id === productID) || new Product();
  }

}
