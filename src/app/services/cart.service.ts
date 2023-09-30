import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // @des: cart items secices
  // using Angular signals

  // public cartItems = signal<Product[]>([]);
  // public totalItems = computed(() => this.cartItems().length);
  // public subTotal = computed(() =>
  //   this.cartItems().reduce(
  //     (prev: number, curr: Product) => prev + curr.price,
  //     0
  //   )
  // );

  // constructor() {}

  // // add product to cart
  // addToCart(product: Product) {
  //   this.cartItems.mutate((val) => {
  //     val.push(product);
  //   });
  // }

  // // remove a product from a cart
  // removeProduct(id: number) {
  //   this.cartItems.mutate((val) => {
  //     val.splice(id, 1);
  //   });
  // }

  // ---- another cart service method ----

  public cartItems: Product[] = [];
  public subTotal = 0;

  constructor() {
    // init run check cart items in localStorage
    const cartItemsStr = localStorage.getItem('cartItems');
    if (cartItemsStr) {
      this.cartItems = JSON.parse(cartItemsStr);
    }

    // also calculating the sub-total
    // if there is any cart items
    this.calTotal();
  }

  // add product to cart
  addToCart(product: Product) {
    this.cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calTotal();
  }

  // remove a product from a cart
  removeProduct(id: number) {
    this.cartItems.splice(id, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calTotal();
  }

  // calculate sub-total if cartItems changes
  private calTotal() {
    this.subTotal = this.cartItems.reduce(
      (prev: number, curr: Product) => prev + curr.price,
      0
    );
  }
}
