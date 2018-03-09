import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../shared/model/common/User.model';

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

    constructor(private authenticationService : AuthenticationService) {

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
        console.log(this.loginForm);

    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email , this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login succesful
                    console.log("LoggedIn succesful");
                } else {
                    console.log("Login Failed");
                    this.loading = false;
                }
            }, error => {
                this.loading = false;
                this.error = error;
            })
    }
}