import { Genre } from './Genre.model';
import { Movies } from './Movies.model';

export class MovieGenres {
    public movieGenreId : number;
    public genre : Genre;
    public movies : Movies;
}