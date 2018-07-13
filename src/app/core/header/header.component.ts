import {UserDetail} from '../../shared/model/common/UserDetail.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfoService } from "../../auth/user_info.service";
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from "../../shared/service/api/login.service";
import { UserDetailService } from "../../shared/service/api/user-detail.service";
import { UserDetailResponse } from '../../shared/model/common/UserDetailResponse.model';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated: boolean;
    isLoggedIn : boolean = false;
    isLoggedInSubscription : Subscription;
    userIdSubscription : Subscription;
    userDetailSubscription : Subscription;
    userNameDisplay : string;
    userPic : string;
    userId : string;
    currentUserDetail : UserDetailResponse;
    isActivatedStyle : string;
    isAcctActivated : boolean;

    constructor(private userInfoService : UserInfoService,
                private loginService : LoginService,
                private userDetailService : UserDetailService) {

    }

    ngOnInit() {
        this.isLoggedInSubscription = this.userInfoService.isLoggedInSubject.subscribe(
            (result : boolean) => {
                this.isLoggedIn = result;
                console.log(result);
                // If user is loggedIn subscribe to userDetail
                // if (this.isLoggedIn) {
                //     this.userDetailSubscription = this.userDetailService.getUserDetail(this.userId).subscribe(
                //         (user : string) => {
                //             this.userNameDisplay = "Test User";
                //         }   
                //     );
                // }


            }
        );

        this.userDetailService.currentUserDetail.subscribe(
            (jsonResp : UserDetailResponse) => {
                this.currentUserDetail = jsonResp;
                this.userNameDisplay = this.currentUserDetail.firstName + ' ' + this.currentUserDetail.lastName;
                this.userPic = this.currentUserDetail.photoUrl;
                this.isAcctActivated = this.currentUserDetail.acctActivated;
                console.log(this.currentUserDetail.acctActivated +" Activated");
                console.log(this.userNameDisplay + " UserName");
            },
            (error: Error) => {
                console.log(error);
            }, 
            () => {
                console.log("finished current user detail subscription");
            }
        );

        if (this.isAcctActivated) {
            this.isActivatedStyle = 'disabled';
        } else {
            this.isActivatedStyle = 'enabled';
        }

       this.userIdSubscription = this.userInfoService.userIdSubject.subscribe(
            (userId : string) => {
                this.userId = userId;
                console.log(this.userId +"userId11");
                console.log(this.isLoggedIn);
                if (this.userId != null) {
                    this.userDetailService.getUserDetail(this.userId)
                    .subscribe(
                        (resp: UserDetailResponse) => {
                            this.userDetailService.currentUserDetail.next(resp);
                        }
                    );
                }
            }
        );
        
        // if (this.isLoggedIn) {
        //     this.userDetailService.getUserDetail(this.userId)
        //     .subscribe(
        //         (resp: UserDetailResponse) => {
        //             this.userDetailService.currentUserDetail.next(resp);
        //         }
        //     );
        // }

        // console.log("I Am loggeedIn");
        //     if(this.isLoggedIn) {
        //     //if (this.userId !== null || this.userId !== undefined) {
        //         this.userDetailService.getUserDetail(this.userId);
        //     //  }
        // }

    }

    ngOnDestroy(): void {
        this.isLoggedInSubscription.unsubscribe();
        this.userIdSubscription.unsubscribe();
    }

    // Logout User
    onLogout() {
        this.loginService.logout();
    }
}