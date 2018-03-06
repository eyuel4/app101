import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProductService {
    // Observable string resources
    private productListSource = new Subject<string>();

    // Observable string streams
    productList = this.productListSource.asObservable();

    // Service product commands
    passName(productName : string) {
        this.productListSource.next(productName);
    }
}