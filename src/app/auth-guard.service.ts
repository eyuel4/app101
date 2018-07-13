import { CanActivate,CanActivateChild , ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { UserInfoService } from "./auth/user_info.service";
import { AppConfig } from "./config/app.config";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private userInfoService : UserInfoService,
                private myRoute : Router) {}

    canActivate(route : ActivatedRouteSnapshot,
                state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        if(this.userInfoService.isLoggedIn()) {
            return true;
        } else {
            this.myRoute.navigate([AppConfig.navigation_endpoints.login]);
            return false;
        }
    }

    canActivateChild(route : ActivatedRouteSnapshot,
                     state : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route,state);
    }
}