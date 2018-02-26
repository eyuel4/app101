import { Genre } from './Genre.model';

export class GenreType {
    public id : number;
    public name : string;
    public description : string;
    public genres : Array<Genre>;
}