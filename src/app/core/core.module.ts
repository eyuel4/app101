import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ],
    exports: [
       HeaderComponent,
       HomeComponent,
       FooterComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ]
})
export class CoreModule {

}