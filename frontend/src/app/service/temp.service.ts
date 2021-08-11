import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  orderingProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  currentSum: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addProductToOrderList(product: Product): void {
    this.orderingProducts.next([...this.orderingProducts.getValue(), product]);
    this.currentSum.next(this.orderingProducts.getValue().reduce((acc, curr) => acc += curr.price, 0))
  }

  delProductFromOrderList(product: Product): Observable<Product[]> {
    const productIndex = this.orderingProducts.getValue().findIndex(op => op._id === product._id);
    this.orderingProducts.getValue().splice(productIndex, 1);
    this.currentSum.next(this.orderingProducts.getValue().reduce((acc, curr) => acc += curr.price, 0))
    return this.orderingProducts;
  }

  clearTemp(): void {
    this.orderingProducts.next([]);
  }

  getAllOrderingProducts(): Observable<Product[]> {
    return this.orderingProducts;
  }
}
