import {Observable} from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup , FormControl, Validators} from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../shared/model/common/User.model';


@Component ({
    selector:'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup

    constructor(private authService : AuthenticationService) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
            'username' : new FormControl(null, [Validators.required, this.userNameValidation.bind(this)]),
            'firstName' : new FormControl(null),
            'lastName' : new FormControl(null),
            'password' : new FormControl(null)
        });
    }

    onSubmit() : void {
        console.log(this.signupForm);
        let user = new User();
        user = this.signupForm.value;
        console.log(user);
        let result = this.authService.signUp(user).subscribe(
            (data) => {
                console.log("User Regisetred");
            },
            (error : Error) => {
                console.log(error);
            });
        //.subscribe(result => { });
        console.log(result + "result")
    }

    userNameValidation(control: FormControl) : {[s: string] : boolean} {
        var username : string = control.value;
        if(username !== null) {
            if(!(this.validatePhone(username) || this.validateEmail(username))) {
                return { 'usernameIsValid' : false}
            }
            return null;
        }
    }
    
    validateEmail(email : string) : boolean {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = re.test(email);
        return result;
    }

    validatePhone(phoneNo) {
        if(phoneNo !== null) {
           if (phoneNo.value == "") {
               return false
            } else if (isNaN(parseInt(phoneNo))) {
                return false;
            } else if (!(phoneNo.length == 10)) {
                return true;
            } 
            return true;
        }
    }
}