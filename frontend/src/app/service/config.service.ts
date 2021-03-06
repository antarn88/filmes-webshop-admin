// tslint:disable: no-bitwise
import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';

export interface ITableColumn {
  title?: string;
  key?: string;
  customized?: boolean;
  hidden?: boolean;
  pipes?: any[];
  pipeArgs?: any[][];
  htmlOutput?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // For scroll
  startItem: number = 0;
  endItem: number = 30;
  scrollSize: number = 10;

  // View for pages
  view: string = 'grid';

  productColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { key: "name", title: "Név" },
    { key: "description", title: "Leírás", htmlOutput: ConfigService.stringShortener },
    {
      key: "price", title: "Ár", pipes: [
        new CurrencyPipe('hu-HU')
      ], pipeArgs: [['HUF', 'symbol', '3.0']]
    },
    { key: "photo", title: "Kép" },
    { key: "active", title: "Aktív", htmlOutput: ConfigService.activeOrInactiveSign },
  ];

  orderColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { title: "Vásárló neve", customized: true, htmlOutput: ConfigService.setCustomerNameFromObject },
    { title: "Vásárló email címe", customized: true, htmlOutput: ConfigService.setCustomerEmailFromObject },
    { title: "Termékek", customized: true, htmlOutput: ConfigService.setOrderedProductsFromObject },
    { title: "Végösszeg", customized: true, htmlOutput: ConfigService.setTotalSum },
    { key: "note", title: "Megjegyzés" },
    { title: "Státusz", customized: true, htmlOutput: ConfigService.setStatus },
  ];

  deliveryColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { title: "Vásárló neve", customized: true, htmlOutput: ConfigService.setCustomerNameFromObject },
    { title: "Vásárló email címe", customized: true, htmlOutput: ConfigService.setCustomerEmailFromObject},
    { title: "Vásárló lakcíme", customized: true, htmlOutput: ConfigService.setCustomerAddressFromObject},
    { title: "Termékek", customized: true, htmlOutput: ConfigService.setOrderedProductsFromObject },
    { key: "note", title: "Megjegyzés" },
  ];

  billColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { title: "Vásárló neve", customized: true, htmlOutput: ConfigService.setCustomerNameFromObject },
    { title: "Vásárló email címe", customized: true, htmlOutput: ConfigService.setCustomerEmailFromObject },
    { title: "Vásárló lakcíme", customized: true, htmlOutput: ConfigService.setCustomerAddressFromObject },
    { title: "Termékek", customized: true, htmlOutput: ConfigService.setOrderedProductsFromObject },
    {
      key: "sum", title: "Összeg", pipes: [new CurrencyPipe('hu-HU')],
      pipeArgs: [['HUF', 'symbol', '3.0']]
    },
    { key: "paid", title: "Fizetett", htmlOutput: ConfigService.activeOrInactiveSign },
  ];

  adminColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { key: "email", title: "Email" },
    { key: "password", title: "", htmlOutput: ConfigService.passwordToStars, hidden: true },
    { key: "active", title: "Státusz", htmlOutput: ConfigService.activeOrInactiveSign },
  ];

  customerColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { title: "Név", customized: true, htmlOutput: ConfigService.mergeNames },
    { key: "email", title: "Email" },
    { key: "address", title: "Lakcím" },
    { key: "active", title: "Státusz", htmlOutput: ConfigService.activeOrInactiveSign },
  ];

  constructor(
    public customerService: CustomerService,
    public productService: ProductService,
    public billService: BillService
  ) { }

  static activeOrInactiveSign(value: boolean): string {
    const icon: string = value ? 'fa-check' : 'fa-remove';
    return `<i class="fa ${icon}"></i>`;
  };

  static stringShortener(originalString: string): string {
    if (originalString) {
      const cutLength = 45;
      if (originalString.length > cutLength) {
        return `${originalString.substring(0, cutLength)}...`;
      }
    }
    return originalString;
  };

  static lineBreaker(arr: []): any {
    if (arr) return arr.join('<br>');
  };

  static mergeNames(row: any): string {
    if (row) return `${row.lastName} ${row.firstName}`;
    return '';
  };

  static setCustomerNameFromObject(row: any): string {
    if (row) return `${row.customer.lastName} ${row.customer.firstName}`;
    return '';
  };

  static setCustomerEmailFromObject(row: any): string {
    if (row) return `${row.customer.email}`;
    return '';
  };

  static setCustomerAddressFromObject(row: any): string {
    if (row) return `${row.customer.address}`;
    return '';
  };

  static setOrderedProductsFromObject(row: any): string {
    if (row) {
      const productStringArray: string[] = [];
      row.products.forEach((product: Product) => productStringArray.push(product.name));
      return productStringArray.join('<br>');
    }
    return '';
  };

  static setTotalSum(row: any): string {
    if (row) return `${Number(row.bill.sum).toLocaleString('HU-hu').toString()} Ft`;
    return '';
  }

  static setStatus(row: any): string {
    if (row) return ConfigService.activeOrInactiveSign(row.bill.paid);
    return '';
  }

  static passwordToStars(password: string): string {
    if (password) {
      return '*'.repeat(password.length);
    }
    return '';
  };

  static entityToString(entity: any) {
    return '' + entity;
  }

  objectIDGenerator(): string {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

}
