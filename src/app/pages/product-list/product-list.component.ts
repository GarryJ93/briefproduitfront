import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  allProduct!: Product[];
  productsToDisplay!: Product[];

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        this.allProduct = [...response];
        this.productsToDisplay = [...response];
        console.log(this.productsToDisplay);
      },
    });
  }
}
