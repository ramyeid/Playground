import { ProductCategoryService } from './../product-categories/product-category.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  // private categorySelectedSubject = new Subject<number>();
  // categorySelectedAction$ = this.categorySelectedSubject.asObservable()
    // .pipe(
      // startWith(0)
    //  );
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  products$ = combineLatest([
    this.productService.productWithAdd$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, selectedCategoryId]) => 
        products.filter(product => 
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
        )),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    this.productService.addProduct();
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log(categoryId);
    this.categorySelectedSubject.next(+categoryId);
  }
}
