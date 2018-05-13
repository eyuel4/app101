import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfoService } from "../../auth/user_info.service";
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from "../../shared/service/api/login.service";
import { UserDetailService } from "../../shared/service/api/user-detail.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated: boolean;
    isLoggedIn : boolean;
    isLoggedInSubscription : Subscription;
    userIdSubscription : Subscription;
    userDetailSubscription : Subscription;
    userNameDisplay : string;
    userId : string;

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
                if (this.isLoggedIn) {
                    this.userDetailSubscription = this.userDetailService.getUserDetail(this.userId).subscribe(
                        (user : string) => {
                            this.userNameDisplay = "Test User";
                        }   
                    );
                }
            }
        );

       this.userIdSubscription = this.userInfoService.userIdSubject.subscribe(
            (userId : string) => {
                this.userId = userId;
                console.log(this.userId +"userId");
            }
        );

        // if(!this.isLoggedIn) {
        //     this.userDetailSubscription = this.userDetailService.getUserDetail(this.userId).subscribe(
        //         (user : string) => {
        //             this.userNameDisplay = "Hello World";
        //             console.log("Hello World from backend");
        //         }
        //     );
        // }

        if(this.isLoggedIn) {
            console.log("Is loggedIn");
        }

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