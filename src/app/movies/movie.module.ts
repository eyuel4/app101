import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MoviesComponent } from './movies.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieItemComponent } from './movie-list/movie-item/movie-item.component';
import { MovieDetailComponent} from './movie-detail/movie-detail.component';
import { MoviesListComponent } from './movie-list/movies-list.component';
import { MovieService } from '../shared/service/movie.service';

@NgModule({
    declarations:[
        MoviesComponent,
        MovieItemComponent,
        MovieDetailComponent,
        MoviesListComponent
    ],
    exports:[

    ],
    imports:[
        MovieRoutingModule,
        CommonModule,
        HttpClientModule
    ],
    providers: [
        MovieService
    ]
})
export class MovieModule {

}