import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  allCategories!: Categorie[];
  categoriesToDisplay!: Categorie[];
  addProduct!: FormGroup;

  constructor(
    private categorieService: CategorieService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    

    this.categorieService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = [...response];
        this.categoriesToDisplay = [...response];
        console.log(this.categoriesToDisplay);
      },
    });
    this.initialForm();
  }

  private initialForm() {
    this.addProduct = this.fb.group({
      nom: new FormControl('', Validators.required),
      prix: new FormControl('', Validators.required),
      quantite: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let newProduct: Partial<Product> = {
      nom: this.addProduct.value.nom,
      prix: +this.addProduct.value.prix,
      quantite: +this.addProduct.value.quantite,
      id_categorie: +this.addProduct.value.categorie
    };
    if (!this.addProduct.valid) {
      newProduct = {
        nom: this.addProduct.value.nom,
        prix: +this.addProduct.value.prix,
        quantite: +this.addProduct.value.quantite,
        id_categorie: +this.addProduct.value.categorie,
      };}
      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          
          this.messageService.add({
            severity: 'success',
            summary: 'Opération réussie',
            detail: 'Produit ajouté avec succès',
          });
         setTimeout(() => {
           this.router.navigate(['/product']);
         }, 2000);
          
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout du produit", error);
        },
      });
    
  }
}
