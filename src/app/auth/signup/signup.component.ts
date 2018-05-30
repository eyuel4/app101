//import {HttpResponse} from '@angular/common/http/src/response';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import { UploadService } from '../../shared/service/api/upload.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { User } from '../../shared/model/common/User.model';
import { UserDetail } from "../../shared/model/common/UserDetail.model";
import { LoginService } from '../../shared/service/api/login.service';
import { UserInfoService } from '../user_info.service';
import { UserDetailService } from '../../shared/service/api/user-detail.service';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { AppConfig } from '../../config/app.config';

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
    serverSideValid : string = "No error";
    respUserDetail : UserDetail;

    profile_pic : string;

    constructor(private authService : AuthenticationService,
                private uploadService : UploadService,
                private loginService : LoginService,
                private router : Router,
                private userInfoService : UserInfoService,
                private userDetailService : UserDetailService ) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
            'username' : new FormControl(null, [Validators.required, this.invalidUserNameValidation.bind(this)]),
            'firstName' : new FormControl(null),
            'lastName' : new FormControl(null),
            'password' : new FormControl(null),
            'photo' : new FormControl(null)
           // , this.userNameValidation.bind(this)
        });
        this.profile_pic = "/assets/user_icon.png";

    }

    ngOnDestroy() {
        if (this.authSubscription != null  && this.loginSubscription != null) {
            this.authSubscription.unsubscribe();
            this.loginSubscription.unsubscribe();
        }

    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
                this.profile_pic = event.target.result;
                console.log(this.localUrl);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    upload() {
        this.currentFileUpload = this.selectedFiles.item(0);
        console.log(this.currentFileUpload.webkitRelativePath);

        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
            (event) => {
            if (event.type === HttpEventType.UploadProgress) {
                console.log('Upload Progress: ' + Math.round(event.loaded /event.total) * 100 + '%');
            } else if (event.type === HttpEventType.Response) {
                console.log(event);
            }
        },
        (error : Error) => {
            console.log(error);
        }
    );

        this.selectedFiles = undefined;
    }

    onSubmit() : void {
        console.log(this.signupForm);
        let user = new User();
        user = this.signupForm.value;
        console.log(user);
        
        this.upload();

        this.authSubscription = this.authService.signUp(user)
        .subscribe(
            (response : UserDetail) => {
                console.log(response);
                this.respUserDetail = response;
                console.log("User Regisetred");
            },
            (error : HttpErrorResponse) => {
                this.serverSideValid = error.error;
                console.log(this.serverSideValid);
                console.log(this.signupForm);
            },
            () => {
                if(this.respUserDetail.username !== null) {
                    console.log(this.respUserDetail.username);
                    this.loginService.getToken(this.respUserDetail.username, user.password)
                    .subscribe(jsonResp => {
                        if (jsonResp !== undefined && jsonResp !== null) {
                            console.log("User Login Successful after signup!");
                            console.log(jsonResp);
                            this.userInfoService.isLoggedIn();
                            this.userDetailService.getUserDetail(this.respUserDetail.idUser.toString());
                            this.router.navigate([AppConfig.navigation_endpoints.home]);
                        }
                    });
                }
            }
        );

        //.subscribe(result => { });
        console.log(this.authSubscription + "result")
    }

    // userNameValidation(control: FormControl) : {[s: string] : boolean} {
    //     var username : string = control.value;
    //     if(username !== null) {
    //         if(!(this.validatePhone(username) || this.validateEmail(username))) {
    //             return { 'usernameIsValid' : false}
    //         }
    //         return null;
    //     }
    // }

    invalidUserNameValidation(control: FormControl) : {[s: string] : boolean} {
        if (this.serverSideValid !== 'No error') {
            console.log(this.serverSideValid);
            return {'usernameIsInvalid' : false};
        }
        return null;
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
localUrl: any;
    showPreviewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            this.selectFile(event);
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
                this.selectedFiles = event.target.files;
                this.profile_pic = event.target.result;
                console.log(this.localUrl);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}