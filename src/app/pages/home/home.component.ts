import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }
}
