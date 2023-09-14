import { Component, Input } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input() product: Product | undefined;
}
