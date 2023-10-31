import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  allProduct!: Product[];
  productsToDisplay!: Product[];

  constructor(private productService: ProductService,
    private messageService: MessageService,
  private router: Router) { }

  ngOnInit() {
    this.productService.getAllProduct().subscribe({
      next: (response) => {
        this.allProduct = [...response];
        this.productsToDisplay = [...response];
        console.log(this.productsToDisplay);
      },
    });
  }

  OnDeleteProduct(idProduct: number) {
    this.productService.deleteProduct(idProduct).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Supprimé',
          detail: 'Produit supprimé !',
        });
        setTimeout(() => {
          location.reload();
        },2000)
      }
    })
  }

  OnDisconnect() {
    localStorage.clear();
    this.router.navigate(['/product-list']);
  }
}
    
