import { Movies } from './Movies.model';
import { User } from '../common/User.model';

export class MovieComment {
    public movieCommentId : number;
    public movies : Movies;
    public user : User;
    public comment : string;
    public commentDate : Date;
}