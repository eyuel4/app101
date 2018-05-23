import {UserDetail} from '../../model/common/UserDetail.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from  '../../../config/app.config';
import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../../../auth/user_info.service';
/**
 * The following Service will send UserId to backend Server and get additional User Info
 * like FullName, Email, ProfilePic
 */
@Injectable()
export class UserDetailService {
    private isLoggedIn : boolean = false;
    public currentUserDetail : Subject<UserDetail> = new Subject<UserDetail>();

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
        params.append('id', userId);

        let userDetailSubject = new Subject<any>();

        // this.userInfoService.isLoggedInSubject
        //     .subscribe(
        //         (result: boolean) => {
        //             this.isLoggedIn = result;
        //         }
        //     )
        //     if(this.isLoggedIn) {
            let url : string = '/ibex/api/user';
            url = url + '/' +userId;
                this.apiRequest.get(url, AppConfig.server_type.resource_server, params)
                .subscribe(
                    (jsonResp : UserDetail) => {
                        console.log("Response on getUserDetail from backend");
                        if (jsonResp !== undefined && jsonResp !== null) {
                            console.log("UserDetail JsonResponse is not null");
                            console.log(jsonResp);
                        }
                        userDetailSubject.next(jsonResp);
                    });
           // }
        return userDetailSubject;
    }

}