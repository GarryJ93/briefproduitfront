import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/produit');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/produit/${id}`);
  }

  addProduct(Product: Partial<Product>): Observable<Partial<Product>> {
    
    return this.http.post<Product>(
      'http://localhost:3000/api/produit',
      Product,
      { headers: this.getHeaders() }
    );
  }

  updateProduct(
    id: number,
    updateData: Partial<Product>
  ): Observable<Partial<Product>> {
    console.log(this.getHeaders());
    
    return this.http.patch<Product>(
      `http://localhost:3000/api/produit/${id}`,
      updateData,
      { headers: this.getHeaders() }
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      `http://localhost:3000/api/produit/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
