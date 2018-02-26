import { Movies } from './Movies.model';

export class MovieRating {
    public ratingId : number;
    public ratingPoint : number;
    public totalRatingCount : number;
    public lastRated : Date;
    public movies : Array<Movies>;
    
}