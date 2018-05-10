import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfoService } from "../../auth/user_info.service";
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from "../../shared/service/api/login.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated: boolean;
    isLoggedIn : boolean = false;
    isLoggedInSubscription : Subscription;
    userNameSubscription : Subscription;
    userIdSubscription : Subscription;
    userNameDisplay : string;
    userId : string;

    constructor(private userInfoService : UserInfoService,
                private loginService : LoginService) {

    }

    ngOnInit() {
        this.isLoggedInSubscription = this.userInfoService.isLoggedInSubject.subscribe(
            (result : boolean) => {
                this.isLoggedIn = result;
                console.log(result);
            }
        );
        this.userNameSubscription = this.userInfoService.userNameSubject.subscribe(
            (userName : string) => {
                this.userNameDisplay = userName;
                console.log(this.userNameDisplay);
            }
        );

       this.userIdSubscription = this.userInfoService.userIdSubject.subscribe(
            (userId : string) => {
                this.userId = userId;
                console.log(this.userId +"userId");
            }
        )

    }

    ngOnDestroy(): void {
        this.isLoggedInSubscription.unsubscribe();
        this.userNameSubscription.unsubscribe();
        this.userIdSubscription.unsubscribe();
    }

    // Logout User
    onLogout() {
        this.loginService.logout();
    }
}