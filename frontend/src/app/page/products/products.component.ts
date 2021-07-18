import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getAll();
  headers: any;

  constructor(
    private productService: ProductService,
  ) { }


  
  ngOnInit(): void {
    this.headers = {
      text: ['ID', "Name", "Leírás", "ár", "kép", "aktív"],
      keys: ['_id', 'name', 'description', 'price', 'photo', 'active']
    };
  }

  stringShorter(inputString: string, length: number): string {
    if (inputString.length > length) {
      return `${inputString.substring(0, length)}...`;
    }
    return inputString;
  }

}
