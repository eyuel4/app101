import {Router, ActivatedRoute} from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Base64 } from 'js-base64';
import { Subject } from 'rxjs/Subject';

import { User } from '../shared/model/common/User.model';
import { ApiRequestService } from "../shared/service/api/api-request.service";
import { UserDetail } from "../shared/model/common/UserDetail.model";

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8082/ibexapp/ibex/api/authenticate';
    private signUpUrl = 'http://localhost:8082/ibexapp/ibex/api/signup';
    private headers = new Headers({'Content-Type' : 'application/json'});

    constructor(private httpClient : HttpClient, private apiRequest : ApiRequestService) {

    }

    login(user : User): Observable<boolean> {
        const headers = new HttpHeaders({
            'Content-Type' : 'application/json; charset=utf-8',
            'Authorization' : 'Basic ' + Base64.encode(user.username+ ':' + user.password)
        });
 
        const username = user.username;
        const password = user.password;
        console.log(username + "+"+password);
        //headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.post(this.authUrl, user, {headers: headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response;
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error:any) => Observable.throw(error || 'Server error'));
    }

    signUp(user : User): Observable<UserDetail> {
        return this.apiRequest.post('/ibex/api/signup', user, "resource");
        

/*        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        if(user == null) { console.log(user)}
        if(user != null) {
            console.log("To be sent to server");
            console.log(user);
            console.log("Json Value");
            console.log(JSON.stringify({user}));
            return this.httpClient.post(this.signUpUrl, user, {headers: headers, responseType :'text'})
            .map((response: string) => {
                let savedUser = response;//.json();
                console.log(savedUser + "User Saved");
                if(savedUser != null) {
                   // this.router.navigate(['/home']);
                    return savedUser;
                }
                else {
                    return null;
                } 
            }).catch((error:any) => 
            Observable.throw(error || 'Server error'));
        }
        */
    }
 
    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      //console.log("Token " + token);
      return token ? token : "";
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}