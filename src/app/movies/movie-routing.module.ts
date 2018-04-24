import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MoviesListComponent } from "./movie-list/movies-list.component";

const movieRoutes: Routes = [
    { path:'', component: MoviesComponent, children: [
        { path:'', component: MoviesComponent, pathMatch: 'full'},
        { path:'list', component: MoviesListComponent },
        { path: 'details', component: MovieDetailComponent},
        { path:':id', component: MoviesComponent}
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