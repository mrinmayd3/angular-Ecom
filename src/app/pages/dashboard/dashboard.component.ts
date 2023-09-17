import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(),
    description: new FormControl(''),
    image: new FormControl(''),
    category: new FormControl(''),
    rating: new FormGroup({
      rate: new FormControl(),
      count: new FormControl(),
    }),
  });

  updateProductId: number | undefined;
  isLoading = false;
  formType = '';

  constructor(private productService: ProductService) {}

  // add product
  handleAddProduct() {
    this.productForm.reset();
    this.formType = 'Add';
  }

  submitAddProduct() {
    this.productService.addProduct(this.productForm.value).subscribe((data) => {
      // console.log(data);

      this.referProducts$.next(false);
    });
  }

  // delete product handler
  handleDelete(id: number) {
    this.productService.deleteProductById(id).subscribe(() => {
      this.referProducts$.next(false);
    });
  }

  // update product
  handleUpdate(id: number) {
    this.updateProductId = id;
    this.formType = 'Update';

    this.products$?.subscribe((data) => {
      const filteredData = data.filter((product) => product.id === id);

      this.productForm.setValue({
        title: filteredData.at(0)?.title!,
        price: filteredData.at(0)?.price,
        description: filteredData.at(0)?.description!,
        image: filteredData.at(0)?.image!,
        category: filteredData.at(0)?.category!,
        rating: {
          rate: filteredData.at(0)?.rating.rate,
          count: filteredData.at(0)?.rating.count,
        },
      });
    });
  }

  submitUpdate() {
    this.isLoading = true;

    fetch(`http://localhost:3000/products/${this.updateProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.updateProductId,
        ...this.productForm.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.referProducts$.next(false);
        this.isLoading = false;
      })
      .catch((e) => console.log(e));
  }

  ngOnInit() {
    this.products$ = this.referProducts$.pipe(
      switchMap((_) => this.productService.getAllProducts())
    );
  }
}
