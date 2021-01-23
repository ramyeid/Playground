import { ProductService } from './../product.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';

    // method2: state management service with notification
    product: IProduct | null;
    sub: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        // method2: state management service with notification
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => this.product = selectedProduct
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // method1: basic state management service
    // get product(): IProduct | null {
    //     return this.productService.currentProduct;
    // }
}
