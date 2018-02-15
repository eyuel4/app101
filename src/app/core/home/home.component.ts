import { Component } from '@angular/core';

import { Movie } from '../../shared/model/Movie.model';
import { Photo } from '../../shared/model/Photo.model';

@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent {
    movies : Movie[] = [
        new Movie(
            '001',
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        )
    ]
}