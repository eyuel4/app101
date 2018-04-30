import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
                private userInfoService : UserInfoService) {}

    getToken(username : string, password : string) : Observable<any> {
        let me = this;

        let bodyData : LoginRequestParam = {
            "username" : username,
            "password" : password,
        }

        let loginDataSubject : BehaviorSubject<any> = new BehaviorSubject<any>([]);
        let loginInfoReturn : LoginInfoInStorage; // Object that we want to send back to Login page

        this.apiRequest.post('/oauth/token', bodyData, "authorization")
            .subscribe(jsonResp => {
                if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS") {
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
    }

    logout(navigatetoLogout=true) : void {
        // clear token remove user from local storage to log user out
        this.userInfoService.removeUserInfo();
        if (navigatetoLogout) {
            
        }
    }
}