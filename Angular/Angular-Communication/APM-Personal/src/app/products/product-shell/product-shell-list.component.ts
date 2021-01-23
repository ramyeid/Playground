import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html',
})
export class ProductShellListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
    this.productService.selectedProductChanges$.subscribe(product => this.selectedProduct = product);
  }

  onSelected(selectedProduct: IProduct): void {
    // method1: basic state management service
    // this.productService.currentProduct = selectedProduct;

    // method2: state management service with notification
    this.productService.changeSelectedProduct(selectedProduct);
  }

}
