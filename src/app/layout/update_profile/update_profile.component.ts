import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserInfoService } from '../../auth/user_info.service';
import { AppConfig } from '../../config/app.config';

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
                private userInfoService : UserInfoService) {}


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
                this.selectedPage = params['endpoint'];
                console.log(params['endpoint']);
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