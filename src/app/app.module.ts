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
import { MoviesService } from './shared/service/movies.service';
import { MovieModule } from './movies/movie.module';
import { UserInfoService } from "./auth/user_info.service";
import { ApiRequestService } from "./shared/service/api/api-request.service";
import { LoginService } from "./shared/service/api/login.service";
import { AppConfig } from "./config/app-config";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    MovieModule
  ],
  providers: [ AuthenticationService, MoviesService, UserInfoService, ApiRequestService, LoginService, AppConfig],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
