import { Artist } from './Artist.model';
import { Movies } from './Movies.model';

export class MovieArtist {
    public movieartistId : number ;
    public artist : Artist;
    public movies : Movies;
}