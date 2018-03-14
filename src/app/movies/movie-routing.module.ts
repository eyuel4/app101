import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';

const movieRoutes: Routes = [
    { path:'', component: MoviesComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(movieRoutes)
    ],
    exports: [
        RouterModule
    ]

})
export class MovieRoutingModule {

}