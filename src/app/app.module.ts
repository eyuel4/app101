import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './core/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewCardComponent } from './shared/view-card/view-card.component';
import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from '../app/auth/authentication.service';
import { MoviesService } from './shared/service/movies.service';
import { MovieModule } from './movies/movie.module';
import { UserInfoService } from './auth/user_info.service';
import { ApiRequestService } from './shared/service/api/api-request.service';
import { LoginService } from './shared/service/api/login.service';
import { UploadService } from './shared/service/api/upload.service';
import { AppConfig } from './config/app-config';
import { TokenInterceptor } from './auth/token_interceptor.service';
import { UserDetailService } from './shared/service/api/user-detail.service';
import { MessageService } from './shared/service/api/message.service';
import { MessageNotificationComponent } from './core/message_notification/message_notification.component';
import { AutoCloseAlertDirective } from './directive/auto-close-alert.directive'; 
import { UpdateProfileModule } from './layout/update_profile/update_profile.module';
import { PageNotFoundComponent } from './layout/404/not_found.component';
import { AuthGuard } from "./auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    MessageNotificationComponent,
    AutoCloseAlertDirective,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    MovieModule,
    UpdateProfileModule
  ],
  providers: [ AuthenticationService, MoviesService, UserInfoService, 
               ApiRequestService, LoginService, AppConfig, UploadService,
               UserDetailService, MessageService, AuthGuard,
                {
                 provide: HTTP_INTERCEPTORS,
                 useClass: TokenInterceptor,
                 multi: true
               } 
            ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
