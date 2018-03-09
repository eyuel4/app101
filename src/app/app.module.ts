import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewCardComponent } from './shared/view-card/view-card.component';
import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from '../app/auth/authentication.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [ AuthenticationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
