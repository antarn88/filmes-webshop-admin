import { Customer } from "./customer";
import { Product } from "./product";

export class Order {
  _id: string = '';
  customer: Customer = new Customer();
  products: Product[] = [];
  time: Date = new Date();
  note: string = '';
}
