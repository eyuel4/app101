import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../shared/model/common/User.model';
import { LoginService } from '../../shared/service/api/login.service';
import { UserInfoService } from "../user_info.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    model: User;
    loading = false;
    error = '';
    errMsg : string = '';
    loginDataSubscription : Subscription;

    constructor(private authenticationService : AuthenticationService,
                private loginService : LoginService,
                private userInfoService : UserInfoService,
                private router : Router) {

    }
    ngOnInit() {
        if (this.userInfoService.isLoggedIn()) {
            this.userInfoService.getUserName();
            this.router.navigate(["/home"]);
        }
        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null),
            'rememberMe': new FormControl(null)
        });
        
        // // reset login status
        // this.authenticationService.logout();
    }

    onSubmit() {
         let user : User = this.loginForm.value;
         this.model = user;
        console.log(this.loginForm);
        console.log(user.username + "" + user.password);
        this.login();
    }

/*    login() {
        console.log("About to login");
        this.loading = true;
        this.authenticationService.login(this.model)
            .subscribe(
                (result : boolean) => {
                if (result === true) {
                    // login succesful
                    console.log("LoggedIn succesful");
                    alert("User LoggedIn");
                } else {
                    console.log("Login Failed");
                    alert("Login Failed");
                    this.loading = false;
                }
            }, (error : Error) => {
                this.loading = false;
                this.error = error.message;
                console.log(error);
            })
    }
    */

    login() {
        this.model = this.loginForm.value;
        if (!this.userInfoService.isLoggedIn()) {
            this.loginService.getToken(this.model.username, this.model.password)
                .subscribe(resp => {
                    if (resp.user === undefined || resp.user.token === undefined || resp.user.token === "INVALID") {
                        this.errMsg = 'Username or password is incorrect';
                        console.log(this.errMsg);
                        return;
                    }
                    console.log("User Login Successful!");
                    console.log(resp.user.userId);
                    this.userInfoService.isLoggedIn();
                    this.userInfoService.getUserName();
                    this.router.navigate([resp.landingPage]);
                },
                errResponse => {
                    switch(errResponse.status) {
                        case 401:
                        this.errMsg = 'Username or password is incorrect';
                        break;
                        case 404:
                        this.errMsg = 'Service not found';
                        case 408:
                        this.errMsg = 'Request Timeout';
                        case 500:
                        this.errMsg = 'Internal Server Error';
                        default:
                        this.errMsg = 'Server Error';
                    }
                }
            );
        }

    }
}