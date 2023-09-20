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

  addToCart(product: Product) {
    console.log(this.cartItems());
    this.cartItems.mutate((val) => {
      val.push(product);
    });
  }

  removeProduct(id: number) {
    this.cartItems.mutate((val) => {
      val.splice(id, 1);
    });

    console.log(this.cartItems());
  }
}
