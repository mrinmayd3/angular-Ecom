import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// types
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product!: Product;
  id!: string | null;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.id &&
      fetch(`https://fakestoreapi.com/products/${this.id}`)
        .then((res) => res.json())
        .then((json) => {
          this.product = json;
          console.log(json);
        });
  }
}
