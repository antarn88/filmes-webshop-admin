import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  product: Product = new Product();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location,
    private config: ConfigService
  ) { }

  async ngOnInit(): Promise<void> {
    const _id = this.activatedRoute.snapshot.params._id;
    if (_id !== '0') {
      const product = await this.productService.getOne(_id).toPromise();
      this.product = product;
    }
  }

  async setProductToDatabase(product: Product, form: NgForm): Promise<void> {
    if (!product._id) {
      const _id = this.config.objectIDGenerator();
      try {
        await this.productService.create({ ...form.value, _id }).toPromise();
        this.router.navigate(['products']);
        this.toastr.success('Sikeresen létrehoztad a terméket!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a termék létrehozásakor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    } else {
      try {
        await this.productService.update(product).toPromise();
        this.router.navigate(['products']);
        this.toastr.success('Sikeresen frissítetted a terméket!', 'Siker!', {
          timeOut: 3000,
        });
      } catch {
        this.toastr.error('Hiba a termék frissítésekor!', 'Hiba!', {
          timeOut: 3000,
        })
      }
    }
  };

  backToTheProductList(): void {
    this.location.back();
  }

}
