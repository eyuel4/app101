import { Component } from '@angular/core';
import { Movies } from "../../shared/model/movie/Movies.model";
import { Photo } from "../../shared/model/common/Photo.model";

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
    movies : Movies[] = [
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        ),
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        ),
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        ),
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        ),
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        ),
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        ),
        new Movies(
            100,
            'Harry Potter',
            'Good movie',
            new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
        )
    ]
}