import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProfileComponent } from './update_profile.component';

const profileRoutes : Routes = [
    { path: '', redirectTo: 'edit', pathMatch: 'full' },
    { path: 'edit/:endpoint', component: UpdateProfileComponent },
    { path: 'edit/password/reset/:token', component: UpdateProfileComponent}
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