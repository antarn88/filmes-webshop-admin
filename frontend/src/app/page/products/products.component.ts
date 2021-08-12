import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/order.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  tableColumns: ITableColumn[] = this.config.productColumns;
  list$: Observable<Product[]> = this.productService.getAll();
  modalTitle: string = '';
  modalText: string = '';
  currentProductForDelete: Product = new Product();

  constructor(
    public config: ConfigService,
    private productService: ProductService,
    private orderService: OrderService,
    private deliveryService: DeliveryService,
    private billService: BillService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  async deleteProductAction(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
        const orders = await this.orderService.getAll().toPromise();
        const deliveries = await this.deliveryService.getAll().toPromise();
        const bills = await this.billService.getAll().toPromise();

        for (const order of orders) {
          for (const product of order.products) {
            if (this.currentProductForDelete._id === product._id) {
              await this.productService.delete(product._id).toPromise();
            }
          }
        }

        for (const delivery of deliveries) {
          for (const product of delivery.products) {
            if (this.currentProductForDelete._id === product._id) {
              await this.productService.delete(product._id).toPromise();
            }
          }
        }

        for (const bill of bills) {
          for (const product of bill.products) {
            if (this.currentProductForDelete._id === product._id) {
              await this.productService.delete(product._id).toPromise();
              const reducedPrice = bill.sum - product.price;
              await this.billService.update({...bill, sum: reducedPrice}).toPromise();
            }
          }
        }

        await this.productService.delete(this.currentProductForDelete._id).toPromise();

        this.list$ = this.productService.getAll();
        this.toastr.success('Sikeresen törölted a terméket!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a termék törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }

    }
  }

  async onClickDelete(product: Product): Promise<void> {
    this.modalTitle = 'Törlés';
    this.modalText = `Biztosan törölni szeretnéd a(z) <b>${product.name}</b> című terméket?`;
    this.currentProductForDelete = product;
  }

  onClickListView(): void {
    this.config.view = 'list'
  }

  onClickGridView(): void {
    this.config.view = 'grid';
  }

  onScroll(): void {
    this.config.endItem += this.config.scrollSize;
  }

  activeOrInactiveSign(value: boolean): string {
    return `Aktív: ${ConfigService.activeOrInactiveSign(value)}`;
  }

}
