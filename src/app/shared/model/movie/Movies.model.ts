import { Photo } from '../common/Photo.model';
import { MovieGenres } from './MovieGenres.model';
import { MovieComment } from './MovieComment.model';
import { MovieArtist } from './MovieArtist.model';
import { MovieTags } from './MovieTags.model';
 
export class Movies {
    public movieId : number;
    public photo : Photo;
    public title : string;
    public length : string;
    public description : string;
    public releaseDate : Date;
    public likeVote : number;
    public dislikeVote : number;
    public averageRating : number;
    public insDate : Date;
    public lastUseDate : Date;
    public movieGeners : Array<MovieGenres>;
    public movieComments : Array<MovieComment>;
    public movieArtists : Array<MovieArtist>;
    public movieTags : Array<MovieTags>;

    constructor(movieId : number, title : string , description : string, photo : Photo) {
        this.movieId = movieId;
        this.title = title;
        this.description = description;
        this.photo = photo;
    }
    
}