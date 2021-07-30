import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';

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
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  // tslint:disable-next-line: no-empty
  ngOnInit(): void {
  }

  async deleteProductAction(confirmedDelete: boolean): Promise<void> {
    if (confirmedDelete) {
      try {
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
