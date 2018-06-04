import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateProfileComponent } from './update_profile.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
    declarations: [
        UpdateProfileComponent
    ],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class UpdateProfileModule{

}