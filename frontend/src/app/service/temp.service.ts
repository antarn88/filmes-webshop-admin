import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  orderingProducts: Product[] = [];

  constructor() { }

  addProductToOrderList(product: Product): void {
    this.orderingProducts.push(product);
  }

  delProductFromOrderList(product: Product): void {
    const productIndex = this.orderingProducts.findIndex(op => op._id === product._id);
    this.orderingProducts.slice(productIndex, 1);
  }

  clearTemp(): void {
    this.orderingProducts = [];
  }

  getAllOrderingProducts(): Product[] {
    return this.orderingProducts;
  }

  getTotalSumOfTempProducts(): number {
    let sum = 0;
    this.orderingProducts.forEach(op => sum += op.price);
    return sum;
  }
}
