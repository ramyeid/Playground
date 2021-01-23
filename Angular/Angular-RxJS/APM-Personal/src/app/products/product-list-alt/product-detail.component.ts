import { catchError, tap, map, filter } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, Subject, combineLatest } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  pageTitle$ = this.productService.selectedProduct$
    .pipe(
      map(product => product? product.productName : null)
    );

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  // productSuppliers$ = this.productService.selectedProductSuppliers$
  //   .pipe(
  //     catchError(err => {
  //       this.errorMessageSubject.next(err);
  //       return EMPTY;
  //     })
  //   );

    productSuppliers$ = this.productService.selectedProductSuppliersJustInTime$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );


    viewModel$ = combineLatest([
      this.product$,
      this.productSuppliers$,
      this.pageTitle$
    ]).pipe(
      filter(([product]) => Boolean(product)),
      map(([product, productSupplier, pageTitle]) => ({ product, productSupplier, pageTitle }))
    );

  

  constructor(private productService: ProductService) { }

}
