import { MovieComment } from '../movie/MovieComment.model';

export class User {
    public idUser : number;
    public username : string;
    public firstName : string;
    public lastName : string;
    public password : string;
    public insDate : Date;
    public lastUpdated : Date;
    public birthday : Date;
}