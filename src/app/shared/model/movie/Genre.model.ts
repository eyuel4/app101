import { GenreType } from './GenreType.model';
import { MovieGenres } from './MovieGenres.model';

export class Genre {
    public genreId : number;
    public genreType : GenreType;
    public name : string;
    public description : string;
    public movieGenres : Array<MovieGenres>;
}