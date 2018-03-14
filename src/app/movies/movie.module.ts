import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MoviesComponent } from './movies.component';
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
    declarations:[
        MoviesComponent
    ],
    exports:[

    ],
    imports:[
        MovieRoutingModule,
        CommonModule
    ]

})
export class MovieModule {

}