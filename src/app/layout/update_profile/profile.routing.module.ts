import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProfileComponent } from './update_profile.component';
import { SubscribedChannelsComponent } from "../subscribed_channels/subscribed_channels.component";
import { AuthGuard } from "../../auth-guard.service";

const profileRoutes : Routes = [
    { path: '', redirectTo: 'edit', pathMatch: 'full'},
    { path: 'edit/:endpoint', component: UpdateProfileComponent, canActivate: [AuthGuard]},
    { path: 'edit/password/reset/:token', component: UpdateProfileComponent},
    { path: 'edit/password/recover/:token', component: UpdateProfileComponent},
    { path: 'channels/subscribed', component: SubscribedChannelsComponent, canActivate: [AuthGuard]}
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