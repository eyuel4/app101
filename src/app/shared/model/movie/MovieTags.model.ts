import  { Movies } from './Movies.model';
import { Tags } from './Tags.model';

export class MovieTags {
    public movieTagId : number;
    public movies : Movies;
    public tags : Tags;
}