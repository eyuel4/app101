import { Injectable } from '@angular/core';
import { HttpInterceptor,
        HttpRequest,
        HttpEvent,
        HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';
//import RegExp from "typescript-dotnet-commonjs/System/Text/RegularExpressions";


/**
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private whiteList = [
        new RegExp('http://localhost:8081/ibextubeapp/oauth-server/oauth/token'),
        new RegExp('http://localhost:8082/ibexapp/oauth-resource/ibex/api/signup'),
        new RegExp('http://localhost:8082/ibexapp/oauth-resource/ibex/api/registeration/confirm/.*'),
        new RegExp('http://localhost:8082/ibexapp/oauth-resource/ibex/api/user/profile/upload'),
        new RegExp('http://localhost:8082/ibexapp/oauth-resource/ibex/api/profile/edit/password/.*')
    ]

    constructor(public auth : AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.match(request.url)) {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${this.auth.getToken()}`}});
        }

        return next.handle(request);
    }

    match(url: string): boolean {
        for (const pattern of this.whiteList) {
            if (Array.isArray(url.match(pattern))) { return true; }
        }

        return false;
    }
} 
*/


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private whiteList = [
        'http://localhost:8081/ibextubeapp/oauth-server/oauth/token',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/signup',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/registeration/confirm/1271a5a6-d921-42f8-8e9f-312852371156',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/user/profile/upload',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/profile/edit/password/21eab496-bb07-4ed5-ac90-3a69aeb02d0b',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/profile/edit/password/recover',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/profile/edit/password/recover/05b1df65-9066-41cc-adcf-8a4a3e048ac0'
        //'http://localhost:8082/ibexapp/oauth-resource/ibex/api/profile/edit/password/c703e6ed-9dec-4971-be4f-a037296dd4ff'
    ]
    constructor(public auth : AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request.urlWithParams);
        // If request is not in whitlist add header
        if (!this.whiteList.includes(request.url)) {
            console.log("I was not here");
            console.log(request.url);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }
        return next.handle(request);
    }
}
