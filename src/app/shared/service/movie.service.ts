import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Movies } from "../model/movie/Movies.model";
import { AuthenticationService } from "../../auth/authentication.service";

@Injectable()
export class MovieService  {
    private movieUrl = 'http://localhost:8082/ibexapp/oauth-resource/ibex/api/v1/movies';

    private headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });

    constructor(private http: HttpClient,
                private authenticationService : AuthenticationService) { }

    getMovies() {
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        return this.http.get<Movies[]>(this.movieUrl, {
            headers: this.headers,
            observe: 'body',
            responseType: 'json'
        });
    }
}