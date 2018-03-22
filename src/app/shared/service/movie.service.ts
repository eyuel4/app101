import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movies } from "../model/movie/Movies.model";

@Injectable()
export class MovieService  {
    movieUrl = 'http://localhost:8080/ibexapi/movies';

    constructor(private http: HttpClient) { }

    getMovies() {
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        return this.http.get<Movies[]>(this.movieUrl,{
            headers: headers,
            observe: 'body',
            responseType: 'json'
        });
    }
}