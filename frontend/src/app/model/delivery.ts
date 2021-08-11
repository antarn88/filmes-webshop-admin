import { Customer } from "./customer";
import { Order } from "./order";
import { Product } from "./product";

export class Delivery {
  _id: string = '';
  customer: Customer = new Customer();
  order: string = '';
  products: Product[] = [];
  note: string = '';
}
