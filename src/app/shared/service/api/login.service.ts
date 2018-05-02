import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Base64 } from 'js-base64';

import { UserInfoService, LoginInfoInStorage } from '../../../auth/user_info.service';
import { ApiRequestService } from './api-request.service';

export interface LoginRequestParam {
    username : string;
    password : string;
}

@Injectable()
export class LoginService {
    public landingPage : string = "/home/dashboard/order";
    constructor(private apiRequest : ApiRequestService,
                private userInfoService : UserInfoService,
                private http : HttpClient) {}

    getToken(username : string, password : string) : Observable<any> | any {
        let me = this;

        let bodyData : LoginRequestParam = {
            "username" : username,
            "password" : password,
        }

        let loginDataSubject : BehaviorSubject<any> = new BehaviorSubject<any>([]);
        let loginInfoReturn : LoginInfoInStorage; // Object that we want to send back to Login page

        this.apiRequest.postForToken('/oauth/token', bodyData, "authorization")
            .subscribe(jsonResp => {
                if (jsonResp !== undefined && jsonResp !== null) {
                    console.log("JsonResponse is not null");
                    // Create a success object that we want to send back to login page
                    loginInfoReturn = {
                        "success" : true,
                        "message" : jsonResp.operationMessage,
                        "landingPage" : this.landingPage,
                        "user" : {
                            "userId" : jsonResp.item.userId,
                            "email" : jsonResp.item.emailAddress,
                            "displayName" : jsonResp.item.firstName + " " + jsonResp.item.lastName,
                            "token" : jsonResp.item.token,
                        }
                    };
                    // Store username and JWT token in local storage to keep user logged in
                    this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));
                }
                else {
                    // Create a failure object that we want to send back to login page
                    loginInfoReturn = {
                        "success": false,
                        "message": jsonResp.msgDesc,
                        "landingPage": "/login"
                    };
                }
                console.log(loginInfoReturn);
                loginDataSubject.next(loginInfoReturn);
            },
        err => {
            loginInfoReturn = {
                "success": false,
                "message": err.url + ">>>" + err.statusText + "[" + err.status +"]",
                "landingPage": "/login"
            };
        });
        return loginDataSubject;
        
     /*  let authUrl = 'http://localhost:8081/ibextubeapp/oauth-server/oauth/token';
       const headers = new HttpHeaders({
        'Content-Type' : 'application/json; charset=utf-8',
        'Authorization' : 'Basic ' + Base64.encode('fooClientIdPassword:secret')
    });

        let params = new HttpParams()
                     .set('grant_type','password')
                     .set('username',bodyData.username)
                     .set('password',bodyData.password);

       return this.http.post(authUrl, null, {headers: headers, params: params})
           .map((response: Response) => {
               if (response !== undefined && response !== null && response.ok) {

               }

           }).catch((error:any) => Observable.throw(error || 'Server error')); */
    } 

    logout(navigatetoLogout=true) : void {
        // clear token remove user from local storage to log user out
        this.userInfoService.removeUserInfo();
        if (navigatetoLogout) {
            
        }
    } 
}