import { Bill } from "./bill";
import { Customer } from "./customer";
import { Product } from "./product";

export class Order {
  _id: string = '';
  customer: Customer = new Customer();
  bill: Bill = new Bill();
  products: Product[] = [];
  note: string = '';
}
