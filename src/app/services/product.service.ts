import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/products`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.API}/products/${id}`);
  }

  deleteProductById(id: number) {
    return this.http.delete(`${this.API}/products/${id}`);
  }
}
