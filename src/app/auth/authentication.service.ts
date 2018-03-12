import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8080/auth';
    private headers = new Headers({'Content-Type' : 'application-json'});

    constructor(private httpClient : HttpClient) {

    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders({'Content-Type' : 'application-json; charset=utf-8'});
        //headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json();
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
 
    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      return token ? token : "";
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}