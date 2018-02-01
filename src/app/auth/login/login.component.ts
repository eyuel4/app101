import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.email]),
            'password': new FormControl(null),
            'rememberMe': new FormControl(null)
        });
    }

    onSubmit() {
        console.log(this.loginForm);
    }
}