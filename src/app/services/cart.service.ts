import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = signal<Product[]>([]);
  public totalItems = computed(() => this.cartItems().length);
  public subTotal = computed(() =>
    this.cartItems().reduce(
      (prev: number, curr: Product) => prev + curr.price,
      0
    )
  );

  constructor() {}

  // add product to cart
  addToCart(product: Product) {
    this.cartItems.mutate((val) => {
      val.push(product);
    });
  }

  // remove a product from a cart
  removeProduct(id: number) {
    this.cartItems.mutate((val) => {
      val.splice(id, 1);
    });
  }
}
