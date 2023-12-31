import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

// types
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products$: Observable<Product[]> | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  // on component mount fetching the data from api
  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }

  // add a product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
