import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProductService } from 'src/app/services/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Categorie } from 'src/app/models/categorie';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  product!: Product;
  updateProduct!: FormGroup;
  allCategories!: Categorie[];
  categoriesToDisplay!: Categorie[];
  productIdFromRoute!: number;
  newCategory!: Categorie;
  constructor(
    private productService: ProductService,
    private categorieService: CategorieService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    

    const routeParam = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParam.get('id'));

    this.productService.getProductById(this.productIdFromRoute).subscribe({
      next: (response) => {
        this.product = response;
        this.initialForm();
      },
    });

    this.categorieService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = [...response];
        this.categoriesToDisplay = [...response];
        console.log(this.categoriesToDisplay);
      },
    });
    
  }

  private initialForm() {
    if (this.product) {
      this.updateProduct = this.fb.group({
        nom: new FormControl(this.product.nom, Validators.required),
        prix: new FormControl(this.product.prix, Validators.required),
        quantite: new FormControl(this.product.quantite, Validators.required),
        id_categorie: new FormControl(this.product.id_categorie, Validators.required),
      });
      console.log(this.updateProduct.value);
    }
  }

  onSubmit(idProduct: number) {
  
    if (this.categoriesToDisplay && this.updateProduct.valid) {
    this.newCategory = this.categoriesToDisplay.find((cat) => cat.id === +this.updateProduct.value.id_categorie)!;
    console.log('newCat', this.newCategory);
    
    if (this.newCategory && this.updateProduct.valid) {
      let updatedProduct: Partial<Product> = {
        nom: this.updateProduct.value.nom,
        prix: +this.updateProduct.value.prix,
        quantite: +this.updateProduct.value.quantite,
        id_categorie: +this.updateProduct.value.id_categorie,
        categorie: this.newCategory
      };

      console.log(updatedProduct);
    
      this.productService.updateProduct(idProduct, updatedProduct).subscribe({
        next: (response) => {
          console.log('Produit mis à jour', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Mise à jour',
            detail: 'Donnée mise à jour !',
          });
          setTimeout(() => {
            this.router.navigate(['/product'])
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
        },
      });
    }}
  }
}
