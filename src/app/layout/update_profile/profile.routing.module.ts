import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProfileComponent } from './update_profile.component';

const profileRoutes : Routes = [
    {path:'', component: UpdateProfileComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports : [
        RouterModule
    ]
})
export class ProfileRoutingModule {

}