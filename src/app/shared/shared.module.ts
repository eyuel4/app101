import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ViewCardComponent } from './view-card/view-card.component';

@NgModule({
    declarations: [
        ViewCardComponent
    ],
    exports: [
        ViewCardComponent,
        CommonModule
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SharedModule {

}