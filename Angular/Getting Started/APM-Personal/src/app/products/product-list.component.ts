import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { IProduct } from './product';
import { Observable, range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css' ]
})
export class ProductListComponent implements OnInit {

    private _pageTitle: string = 'Product List..';
    readonly imageWidth: number = 50;
    readonly imageMargin: number = 2;
    private _showImage: boolean = false;
    private _listFilter: string;
    private _products: IProduct[];
    private _filteredProducts: IProduct[];
    private _errorMessage;

    constructor(private productService: ProductService) {
        this._listFilter = '';
    }

    get pageTitle(): string {
        return this._pageTitle;
    }

    get showImage(): boolean {
        return this._showImage;
    }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this._filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    }

    get filteredProducts(): IProduct[] {
        return this._filteredProducts;
    }

    get products(): IProduct[] {
        return this._products;
    }

    toggleImage(): void {
        this._showImage = !this._showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this._products.filter((product: IProduct) =>
                    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this._pageTitle = `Product List: ${message}`;

        const source$: Observable<number> = range(0, 10);

        source$.pipe(
            map(x => x * 3),
            filter(x => x % 2 == 0)
        ).subscribe(x => console.log(x));
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this._products = products;
                this._filteredProducts = this._products;            
            },
            error: err => this._errorMessage = err
        });
    }
}