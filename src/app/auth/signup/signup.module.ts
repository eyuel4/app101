import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { AccountConfirmationComponent } from '../../layout/account_confirmation/account_confirmation.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
    declarations : [
        SignupComponent,
        AccountConfirmationComponent
    ],
    imports: [
        SignupRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ]

})
export class SignupModule {

}