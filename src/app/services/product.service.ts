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

  // add a new product
  addProduct(value: any) {
    return this.http.post(`${this.API}/products`, value);
  }

  // get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/products`);
  }

  // get a product by its id
  getProductById(id: string) {
    return this.http.get<Product>(`${this.API}/products/${id}`);
  }

  // delete a product by its id
  deleteProductById(id: number) {
    return this.http.delete(`${this.API}/products/${id}`);
  }
}
