import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/produit');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/produit/${id}`);
  }

  addProduct(Product: Partial<Product>): Observable<Partial<Product>> {
    return this.http.post<Product>('http://localhost:3000/api/produit', Product);
  }

  updateProduct(id: number, updateData: Partial<Product>): Observable<Partial<Product>> {
    return this.http.patch<Product>(
      `http://localhost:3000/api/produit/${id}`,
      updateData
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:3000/api/produit/${id}`);
  }
}
