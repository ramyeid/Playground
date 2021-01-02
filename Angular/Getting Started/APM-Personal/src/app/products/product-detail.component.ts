import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  private readonly _route: ActivatedRoute;
  private readonly _router: Router;

  constructor(route: ActivatedRoute, router: Router) {
    this._route = route;
    this._router = router;
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

  ngOnInit(): void {
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.product = {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2019",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "assets/images/leaf_rake.png"
    };
  }
}
