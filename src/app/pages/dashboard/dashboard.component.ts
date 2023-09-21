import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(1000),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    image: new FormControl('', Validators.required),
    category: new FormControl(''),
    rating: new FormGroup({
      rate: new FormControl(0),
      count: new FormControl(0),
    }),
  });

  updateProductId: number | undefined;
  isLoading = false;
  formType = '';

  constructor(private productService: ProductService) {}

  // add product
  // @desc: on click add product form modal will pop up
  handleAddProduct() {
    this.productForm.reset();
    this.formType = 'Add';
  }

  // @desc: submit handler for add new product
  submitAddProduct() {
    this.productService.addProduct(this.productForm.value).subscribe((data) => {
      // console.log(data);

      this.referProducts$.next(false);
      this.productForm.reset();
    });
  }

  // delete product handler
  handleDelete(id: number) {
    this.productService.deleteProductById(id).subscribe(() => {
      this.referProducts$.next(false);
    });
  }

  // update product
  // @desc: on click update product form modal will pop up
  handleUpdate(id: number) {
    this.updateProductId = id;
    this.formType = 'Update';

    this.products$?.subscribe((data) => {
      const filteredData = data.filter((product) => product.id === id);

      this.productForm.setValue({
        title: filteredData.at(0)?.title!,
        price: filteredData.at(0)?.price!,
        description: filteredData.at(0)?.description!,
        image: filteredData.at(0)?.image!,
        category: filteredData.at(0)?.category!,
        rating: {
          rate: filteredData.at(0)?.rating.rate!,
          count: filteredData.at(0)?.rating.count!,
        },
      });
    });
  }

  // @desc: submit handler for update product
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

  // on component mount fetching the data from api
  ngOnInit() {
    this.products$ = this.referProducts$.pipe(
      switchMap((_) => this.productService.getAllProducts())
    );
  }

  //  getting fromControl values
  get title() {
    return this.productForm.get('title');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get image() {
    return this.productForm.get('image');
  }
}
