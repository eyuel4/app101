import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesListComponent } from "./movie-list/movies-list.component";

const movieRoutes: Routes = [
    { path:'', component: MoviesListComponent, children: [
        { path:':id', component: MovieDetailComponent}
    ]}
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