import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { IdTransformPipe } from '../pipe/id-transform.pipe';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';

export interface ITableColumn {
  title?: string;
  key?: string;
  merged?: boolean;
  hidden?: boolean;
  strLength?: any;
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
    {
      key: "customerID", title: "Vásárló neve", pipes: [
        new IdTransformPipe(
          this.customerService,
          this.productService,
          this.billService)
      ],
      pipeArgs: [['customerName']]
    },
    {
      key: "customerID", title: "Vásárló email címe", pipes: [
        new IdTransformPipe(
          this.customerService,
          this.productService,
          this.billService)
      ],
      pipeArgs: [['customerEmail']]
    },
    {
      key: "products", title: "Termékek", pipes: [
        new IdTransformPipe(
          this.customerService,
          this.productService,
          this.billService)
      ],
      pipeArgs: [['products']], htmlOutput: ConfigService.lineBreaker
    },
    {
      key: "billID", title: "Végösszeg", pipes: [
        new IdTransformPipe(
          this.customerService,
          this.productService,
          this.billService
        ), new CurrencyPipe('hu-HU')],
      pipeArgs: [['sum'], ['HUF', 'symbol', '3.0']]
    },
    { key: "note", title: "Megjegyzés" },
    {
      key: "billID", title: "Státusz", pipes: [
        new IdTransformPipe(
          this.customerService,
          this.productService,
          this.billService
        )],
      pipeArgs: [['status']], htmlOutput: ConfigService.activeOrInactiveSign
    },
  ];

  customerColumns: ITableColumn[] = [
    { key: "_id", title: "", hidden: true },
    { title: "Név", merged: true, htmlOutput: ConfigService.mergeNames },
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

}
