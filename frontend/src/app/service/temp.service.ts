import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  orderingProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() { }

  addProductToOrderList(product: Product): void {
    this.orderingProducts.next([...this.orderingProducts.getValue(), product]);
  }

  delProductFromOrderList(product: Product): Observable<Product[]> {
    return this.orderingProducts.pipe(
      tap((list: Product[]) => {
        const productIndex = list.findIndex(op => op._id === product._id);
        list.splice(productIndex, 1);
      })
    );
  }

  clearTemp(): void {
    this.orderingProducts.next([]);
  }

  getAllOrderingProducts(): Observable<Product[]> {
    return this.orderingProducts;
  }

  getTotalSumOfTempProducts(): number {
    let sum = 0;
    this.orderingProducts.pipe(tap(list => list.forEach(op => sum += op.price))).subscribe(() => { });
    return sum;
  }
}
