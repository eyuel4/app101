import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { UserInfoService } from '../../auth/user_info.service';
import { AppConfig } from '../../config/app.config';
import { UserDetailService } from '../../shared/service/api/user-detail.service';
import { MessageService } from '../../shared/service/api/message.service';
import { ResponseMessage } from '../../shared/http_entities/response_message.model';
import { User } from '../../shared/model/common/User.model';
import { Password } from "../../shared/model/common/Password.model";

@Component({
    selector: 'app-update-profile',
    templateUrl: './update_profile.component.html',
    styleUrls: ['./update_profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

    profile_section : string = 'profile';
    password_section : string = 'password';
    recover_section : string = 'recover';

    selectedPage : string = this.profile_section;
    tokenParam : string;
    passwordForm : FormGroup;
    profileForm : FormGroup;
    recoverForm : FormGroup;

    constructor(private route : ActivatedRoute,
                private router : Router,
                private userInfoService : UserInfoService,
                private userDetailService : UserDetailService,
                private messageService : MessageService) {}


    ngOnInit(): void {
        console.log("Wasup")
        
/** 
        this.userInfoService.isLoggedInSubject.subscribe(
            (result: boolean) => {
                console.log(result);
                if (!result) {
                    this.router.navigate([AppConfig.navigation_endpoints.home]);
                }
            }
        )

        if (!this.userInfoService.isLoggedIn()) {
            this.router.navigate([AppConfig.navigation_endpoints.home]);
        }
*/
        this.route.params.subscribe(
            (params) => {
                let selection: string = params['endpoint'];
                this.tokenParam = params['token'];

                console.log(selection);
                if (selection === "password") {
                    //this.selectedPage = params['endpoint'];
                    // call backend api to send reset email and show message email sent
                    this.userDetailService.resetPassword()
                    .subscribe(
                        (response: ResponseMessage) => {
                            console.log("Update Password Link Requested")
                            console.log(response);
                           // this.messageService.setMessage(response);
                        },
                        (error: any) => {
                            console.log(error.error.message + " thrown");
                            let respMsg = new ResponseMessage(false, error.error.message,
                                                             error.error.message,error.status,
                                                             AppConfig.message_type.message_error);
                         //   this.messageService.setMessage(respMsg);
                            this.router.navigate([AppConfig.navigation_endpoints.home]);
                        },
                        () => {
                            this.router.navigate([AppConfig.navigation_endpoints.home]);
                        }
                    );
                } 
                else if (selection == "recover") {
                   this.selectedPage = this.recover_section;
                }
                else if (selection == "photo") {
                    this.selectedPage = params['endpoint'];
                    console.log(params['endpoint']);
                }
                else if (this.router.url.includes("/profile/edit/password/reset")) {
                    this.selectedPage = this.password_section;
                }
                else if (this.router.url.includes("/profile/edit/password/recover")) {
                    this.selectedPage = this.recover_section;
                }
                else {
                    this.router.navigate([AppConfig.navigation_endpoints.home]);
                }
            }
        )

        // this.selectedPage = this.profile_section;
        this.passwordForm = new FormGroup({
            'oldPassword' : new FormControl(null),
            'newPassword' : new FormControl(null),
            'confirmPassword' : new FormControl(null)
        });
        this.profileForm = new FormGroup({
            'photo' : new FormControl(null)
        });
        this.recoverForm = new FormGroup({
           'newPassword' : new FormControl(null),
           'confirmPassword' : new FormControl(null)
        })
    }

    /**
     * Reset User Password
     */
    public onChangePassword() {
        let password = new Password();
        password = this.passwordForm.value;
        console.log(password);
        console.log(this.tokenParam);
        this.userDetailService.updatePassword(password, this.tokenParam)
        .subscribe(
            (response: ResponseMessage) => {
                console.log(response.message);
                console.log(response.message_type);
                this.messageService.setMessage(response);
            },
            (error : any) => {
                let response : ResponseMessage = new ResponseMessage(false, null, error.message, error.statusCode, error.type);
                console.log(error);
            },
            () => {
                this.router.navigate([AppConfig.navigation_endpoints.home]);
            }
        );
    }

    onLoginNavigate() {
        this.router.navigate([AppConfig.navigation_endpoints.login]);
    }

    onRecoverPassword() {
        console.log(this.recoverForm.value);
        console.log(this.tokenParam);
        let password = new Password();
         password = this.recoverForm.value;
        //password.newPassword = this.recoverForm.value.newPassword;
        console.log(password);
        this.userDetailService.changeForgotPassword(password, this.tokenParam)
            .subscribe(
                (response: ResponseMessage) => {
                    console.log(response);
                    this.messageService.setMessage(response);
                },
                (error : any) => {
                    let response : ResponseMessage = new ResponseMessage(false, null, error.message, error.statusCode, error.type);
                    console.log(error);
                },
                () => {
                    this.router.navigate([AppConfig.navigation_endpoints.home]);
                }
            );
    }
}