import { Photo } from './Photo.model';


export class Movies {
    public movieId : number;
    public title : string;
    public length : string;
    public description : string;
    public releaseDate : Date;
    public likeVote : string;
    public dislikeVote : string;
    public photo : Photo;
    public averageRating : number;
    public insDate : Date;
    public lastUseDate : Date;
    public movieGeners : Array<Photo>;

    constructor(movieId : string, title : string , description : string, photo : Photo) {
        this.movieId = this.movieId;
        this.title = this.title;
        this.description = this.description;
        this.photo = this.photo;
    }
}