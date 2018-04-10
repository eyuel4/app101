import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { OktaAuthModule } from '@okta/okta-angular';
import { AuthInterceptor } from './shared/auth.interceptor';

const config = {
  issuer: 'https://dev-686865.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oaem06ruwIoFLeuN0h7'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MovieModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [ AuthenticationService, MoviesService,
               {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
