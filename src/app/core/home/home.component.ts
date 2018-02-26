import { Component } from '@angular/core';

import { Movies } from '../../shared/model/movie/Movies.model';
import { Photo } from '../../shared/model/common/Photo.model';

@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent {
    movies : Movies[] = [
        new Movies(
            '001',
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        )
    ]

    gettitle() : string {
        console.log(this.movies[0].title);
       return this.movies[0].title;
    }
}