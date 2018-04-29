import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../shared/model/common/User.model';
import { LoginService } from 

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

    constructor(private authenticationService : AuthenticationService,
                private loginService : LoginService) {

    }
    ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null),
            'rememberMe': new FormControl(null)
        });

        // reset login status
        this.authenticationService.logout();
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
        this.loginService.getToken(this.model.username, this.model.password)
            .subscribe(resp => {
                if (resp.user === undefined || resp.user.token === undefined) {
                    
                }
            })
    }
}