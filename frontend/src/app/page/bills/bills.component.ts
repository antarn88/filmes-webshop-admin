import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  bills$: Observable<Bill[]> = this.billService.getAll();
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private billService: BillService,
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
