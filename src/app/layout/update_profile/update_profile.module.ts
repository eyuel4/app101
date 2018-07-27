import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateProfileComponent } from './update_profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SubscribedChannelsComponent } from '../subscribed_channels/subscribed_channels.component';
import { PlayListComponent } from '../playlist/playlist.component';

@NgModule({
    declarations: [
        UpdateProfileComponent,
        SubscribedChannelsComponent,
        PlayListComponent
    ],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class UpdateProfileModule{

}