import { Photo } from './Photo.model';

export class Movie {
    public id : number;
    public title : string;
    public length : string;
    public description : string;
    public release_date : Date;
    public like_vote : string;
    public dislike_vote : string;
    public photo_id : Photo;
    public average_rating : number;
    public ins_date : Date;
    public last_use_date : Date;

    constructor(id : string, title : string , description : string, photo_id : Photo) {
        this.id = this.id;
        this.title = this.title;
        this.description = this.description;
        this.photo_id = this.photo_id;
    }
}