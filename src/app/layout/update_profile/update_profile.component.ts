import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserInfoService } from '../../auth/user_info.service';
import { AppConfig } from '../../config/app.config';
import { UserDetailService } from '../../shared/service/api/user-detail.service';
import { MessageService } from '../../shared/service/api/message.service';
import { ResponseMessage } from '../../shared/http_entities/response_message.model';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update_profile.component.html',
    styleUrls: ['./update_profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

    profile_section : string = 'profile';
    password_section : string = 'password';

    selectedPage : string = this.profile_section;
    passwordForm : FormGroup;
    profileForm : FormGroup;

    constructor(private route : ActivatedRoute,
                private router : Router,
                private userInfoService : UserInfoService,
                private userDetailService : UserDetailService,
                private messageService : MessageService) {}


    ngOnInit(): void {
        console.log("Wasup")
        

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
        //this.userInfoService.isLoggedIn();


        this.route.params.subscribe(
            (params) => {
                let selection: string = params['endpoint'];
                
                if (selection === "password") {
                    // call backend api to send
                    this.userDetailService.resetPassword()
                    .subscribe(
                        (response: ResponseMessage) => {
                            console.log("Update Password")
                            this.messageService.setMessage(response);
                        },
                        (error: any) => {
                            console.log(error.error.message + " thrown");
                            let respMsg = new ResponseMessage(false, error.error.message,
                                                             error.error.message,error.status,
                                                             AppConfig.message_type.message_error);
                            this.messageService.setMessage(respMsg);
                            this.router.navigate([AppConfig.navigation_endpoints.home]);
                        },
                        () => {
                           // this.router.navigate([AppConfig.navigation_endpoints.home]);
                        }
                    )
                } 
                else if (selection == "profile") {
                    this.selectedPage = params['endpoint'];
                    console.log(params['endpoint']);
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
        })
    }
}