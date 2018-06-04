import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update_profile.component.html',
    styleUrls: ['./update_profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

    profile_section : string = 'profile-page';
    password_section : string = 'password-page';

    selectedPage : string = null;
    passwordForm : FormGroup;
    profileForm : FormGroup;


    ngOnInit(): void {
        this.selectedPage = this.profile_section;
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