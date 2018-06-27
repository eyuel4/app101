import {UserDetail} from '../../model/common/UserDetail.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from  '../../../config/app.config';
import { ApiRequestService } from './api-request.service';
import { UserInfoService } from '../../../auth/user_info.service';
import { ResponseMessage } from "../../http_entities/response_message.model";
import { Password } from "../../model/common/Password.model";
import { User } from "../../model/common/User.model";
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
            let url : string  = AppConfig.api_endpoints.get_user_detail;
            // let url : string = '/ibex/api/user';
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

    /**
     * Send Reset Password link on Email or Text 
     */
    public resetPassword(): Observable<ResponseMessage> {
        let userInfo : any = this.userInfoService.getUserInfo();
        let userDetail : UserDetail = new UserDetail();
        userDetail.username = userInfo.email;
        console.log(userInfo.email);
        console.log(userInfo.userId);
        return this.apiRequest.post(AppConfig.api_endpoints.reset_password, userDetail, AppConfig.server_type.resource_server);
            
    }

    /**
     * Make Api call to backend update password
     */
    public updatePassword(password : Password, token: string): Observable<ResponseMessage> {
        console.log(password);
        console.log(token);
        //let user : User = new User();
        //user.password = password;
        return this.apiRequest.post(AppConfig.api_endpoints.update_password+"/"+token, password, AppConfig.server_type.resource_server);
    }

}