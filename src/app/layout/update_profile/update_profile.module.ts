import { NgModule } from '@angular/core';

import { UpdateProfileComponent } from './update_profile.component';
import { ProfileRoutingModule } from './profile.routing.module';

@NgModule({
    declarations: [
        UpdateProfileComponent
    ],
    imports: [
        ProfileRoutingModule
    ]
})
export class UpdateProfileModule{

}