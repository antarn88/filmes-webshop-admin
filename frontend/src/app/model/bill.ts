import { Customer } from "./customer";
import { Product } from "./product";

export class Bill {
  _id: string = '';
  customer: Customer = new Customer();
  products: Product[] = [];
  sum: number = 0;
  paid: boolean = false;
}
