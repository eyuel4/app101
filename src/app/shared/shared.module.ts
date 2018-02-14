import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViewCardComponent } from './view-card/view-card.component';

@NgModule({
    declarations: [
        ViewCardComponent
    ],
    exports: [
        ViewCardComponent
    ],
    imports: [
        RouterModule
    ]
})
export class SharedModule {

}