import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Movies } from "../model/movie/Movies.model";

@Injectable()
export class MovieService  {
    movieUrl = 'http://demo5649934.mockable.io/';
    constructor(private http: HttpClient) { }

    getMovies() {
        return this.http.get<Movies[]>(this.movieUrl,{
            observe: 'body',
            responseType: 'json'
        });
    }
}