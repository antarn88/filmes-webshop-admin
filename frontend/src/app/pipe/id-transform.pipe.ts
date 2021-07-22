import { Pipe, PipeTransform } from '@angular/core';
import { BillService } from '../service/bill.service';
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';

@Pipe({
  name: 'idTransform'
})
export class IdTransformPipe implements PipeTransform {

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billService: BillService
  ) {

  }

  async transform(inputData: any, expectedValue: string): Promise<any> {
    if (expectedValue === 'customerName') {
      const customers = await this.customerService.getAll().toPromise();
      const customer = customers.find(c => c._id === inputData);
      return `${customer?.lastName} ${customer?.firstName}`;
    }
    else if (expectedValue === 'customerEmail') {
      const customers = await this.customerService.getAll().toPromise();
      const customer = customers.find(c => c._id === inputData);
      return `${customer?.email}`;
    }
    else if (expectedValue === 'customerAddress') {
      const customers = await this.customerService.getAll().toPromise();
      const customer = customers.find(c => c._id === inputData);
      return `${customer?.address}`;
    }
    else if (expectedValue === 'products') {
      const outputProductNames = [];
      const products = await this.productService.getAll().toPromise();

      for (const product of products) {
        for (const productID of inputData) {
          if (product._id === productID) {
            outputProductNames.push(product.name);
          }
        }
      }

      return outputProductNames;
    }
    else if (expectedValue === 'sum') {
      const bills = await this.billService.getAll().toPromise();
      const bill = bills.find(b => b._id === inputData);
      return `${bill?.sum}`;
    }
    else if (expectedValue === 'status') {
      const bills = await this.billService.getAll().toPromise();
      const bill = bills.find(b => b._id === inputData);
      return bill?.paid;
    }
    return '';
  }

}
