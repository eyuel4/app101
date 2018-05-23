import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppConfig } from  '../../config/app.config';
import { SignupComponent } from './signup.component';
import { AccountConfirmationComponent } from '../../layout/account_confirmation/account_confirmation.component';

const loginRoutes: Routes = [
    { path:'', component: SignupComponent },
    { path: 'confirm/:token', component: AccountConfirmationComponent }
];

@NgModule ({
    imports:[
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SignupRoutingModule {

}