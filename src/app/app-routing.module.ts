import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AppConfig } from './config/app.config';

const appRoutes : Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: AppConfig.routes.home , component: HomeComponent },
    { path: AppConfig.routes.login , loadChildren: './auth/login/login.module#LoginModule'},
    { path: 'signup' , loadChildren: './auth/signup/signup.module#SignupModule'},
    { path: AppConfig.routes.movies, loadChildren: './movies/movie.module#MovieModule'},
    { path: AppConfig.routes.update_profile, loadChildren: './layout/update_profile/update_profile.module#UpdateProfileModule'}
] 

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}