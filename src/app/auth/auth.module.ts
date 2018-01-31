import { NgModule } from '@angular/core';

import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';

@NgModule({
    imports: [
        SignupModule,
        LoginModule
    ]
})
export class AuthModule {

}