import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms'


@Component ({
    selector:'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup

    ngOnInit() {
        this.signupForm = new FormGroup({
            'userName' : new FormControl(null, [Validators.required, this.userNameValidation.bind(this)]),
            'firstName' : new FormControl(null),
            'lastName' : new FormControl(null),
            'password' : new FormControl(null),
            'signup' : new FormControl(null),
            'birthdate' : new FormControl(null)
        });
    }

    onSubmit() : void {
        console.log(this.signupForm);
    }

    userNameValidation(control: FormControl) : {[s: string] : boolean} {
        var userName : string = control.value;
        if(userName !== null) {
            if(!(this.validatePhone(userName) || this.validateEmail(userName))) {
                return { 'userNameIsValid' : false}
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