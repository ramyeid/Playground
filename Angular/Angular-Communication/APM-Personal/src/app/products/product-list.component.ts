import { ProductParameterService } from './product-parameter.service';
import { CriteriaComponent } from './../shared/criteria/criteria.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {  } from '@angular/forms';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Product List';
  includeDetail: boolean = true;

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService) {
  }

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }

  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  ngOnInit(): void {
      this.productService.getProducts().subscribe(
          (products: IProduct[]) => {
              this.products = products;
              this.filterComponent.listFilter = this.productParameterService.filterBy;
          },
          (error: any) => this.errorMessage = <any>error
      );
  }

  ngAfterViewInit() {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  toggleImage(): void {
      this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
      if (filterBy) {
          this.filteredProducts = this.products.filter((product: IProduct) =>
              product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
      } else {
          this.filteredProducts = this.products;
      }
  }

  onFilterChange(value: string): void {
      this.productParameterService.filterBy = value;
      this.performFilter(value);
  }
}
