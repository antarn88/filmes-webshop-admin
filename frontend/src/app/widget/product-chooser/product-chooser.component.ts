import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { TempService } from 'src/app/service/temp.service';

@Component({
  selector: 'app-product-chooser',
  templateUrl: './product-chooser.component.html',
  styleUrls: ['./product-chooser.component.scss']
})
export class ProductChooserComponent implements OnInit {

  currentProduct: Product = new Product();
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private tempService: TempService
  ) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getAll().toPromise();
  }

  async onChangeProduct(productId: string): Promise<void> {
    if (productId !== 'Válaszd ki a terméket') {
      this.currentProduct = await this.productService.getOne(productId).toPromise();
    }
  }

  setAddedProduct(product: Product): void {
    this.tempService.addProductToOrderList(product);
    this.currentProduct = new Product();
    const selector = document.querySelector('#product-select') as HTMLInputElement;
    selector.value = 'Válaszd ki a terméket';
  }
}
