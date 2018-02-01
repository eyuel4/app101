import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

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
        RouterModule
    ]
})
export class CoreModule {

}