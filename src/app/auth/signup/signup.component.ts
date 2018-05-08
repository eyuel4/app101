//import {HttpResponse} from '@angular/common/http/src/response';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import { UploadService } from '../../shared/service/api/upload.service';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../shared/model/common/User.model';



@Component ({
    selector:'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

    signupForm: FormGroup;
    loginSubscription: Subscription;
    authSubscription : Subscription;

    currentFileUpload : File;
    selectedFiles : FileList;

    constructor(private authService : AuthenticationService,
                private uploadService : UploadService) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
            'username' : new FormControl(null, [Validators.required, this.userNameValidation.bind(this)]),
            'firstName' : new FormControl(null),
            'lastName' : new FormControl(null),
            'password' : new FormControl(null)
        });
    }

    ngOnDestroy() {
        if (this.authSubscription != null  && this.loginSubscription != null) {
            this.authSubscription.unsubscribe();
            this.loginSubscription.unsubscribe();
        }

    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    upload() {
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
            // if (event instanceof HttpResponse) {
            //     console.log('File is completely uploaded!');
            // }
        });

        this.selectedFiles = undefined;
    }

    onSubmit() : void {
        console.log(this.signupForm);
        let user = new User();
        user = this.signupForm.value;
        console.log(user);
        this.authSubscription = this.authService.signUp(user).subscribe(
            (response) => {
                if(response === "User Registered") {
                    // Get User from UserService and Login User
                    // Show User 
                    this.loginSubscription = this.authService.login(user).subscribe(
                        (response) => {
                            if(response == true) {
                                console.log("User Login Succesful");
                                alert("User Login Succesful");
                            }
                        }
                    );
                }
                console.log("User Regisetred");
            },
            (error : Error) => {
                console.log(error);
            });
        //.subscribe(result => { });
        console.log(this.authSubscription + "result")
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