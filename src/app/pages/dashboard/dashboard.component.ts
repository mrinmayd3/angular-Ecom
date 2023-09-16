import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

// types
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  products$: Observable<Product[]> | undefined;

  referProducts$ = new BehaviorSubject<boolean>(true);

  constructor(private productService: ProductService) {}

  // delete product handler
  handleDelete(id: number) {
    this.productService.deleteProductById(id).subscribe(() => {
      this.referProducts$.next(false);
    });
  }

  ngOnInit() {
    this.products$ = this.referProducts$.pipe(
      switchMap((_) => this.productService.getAllProducts())
    );
  }
}
