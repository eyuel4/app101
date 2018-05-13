import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../../../auth/user_info.service';
/**
 * The following Service will send UserId to backend Server and get additional User Info
 * like FullName, Email, ProfilePic
 */
@Injectable()
export class UserDetailService {
    private isLoggedIn : boolean = false;

    constructor(
        private apiRequest : ApiRequestService,
        private userInfoService : UserInfoService ) {}

    /**
     * The following method call backend endpoint to get UserDetail
     * @param userId 
     */
    public getUserDetail(userId : string) : Observable<any> {
        //Create Request URL params
        let me = this;
        let params: HttpParams = new HttpParams();
        params =  params.append('id', userId);

        let userDetailSubject = new Subject<any>();

        // this.userInfoService.isLoggedInSubject
        //     .subscribe(
        //         (result: boolean) => {
        //             this.isLoggedIn = result;
        //         }
        //     )
        //     if(this.isLoggedIn) {
                this.apiRequest.get('/ibex/api/user/{userId}', "resource")
                .subscribe(
                    (jsonResp) => {
                        console.log("Response on getUserDetail from backend");
                        let user : string = null;
                        if (jsonResp !== undefined && jsonResp !== null) {
                            console.log("UserDetail JsonResponse is not null");
                            user = null;
                        }
                        userDetailSubject.next(user);
                    });
           // }
        return userDetailSubject;
    }

}