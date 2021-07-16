import { Customer } from "./customer";
import { Product } from "./product";

export class Delivery {
  _id: string = '';
  customer: Customer = new Customer();
  products: Product[] = [];
  date: Date = new Date();
}
