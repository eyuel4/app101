import { Movies } from '../model/movie/Movies.model';
import { Photo } from '../model/common/Photo.model';

export class MoviesService {

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

    constructor() {}

    getMovies() : Movies[] {
        return this.movies.slice();
    }
}