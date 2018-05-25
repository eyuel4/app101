import { Injectable } from '@angular/core';
import { HttpInterceptor,
        HttpRequest,
        HttpEvent,
        HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private whiteList = [
        'http://localhost:8081/ibextubeapp/oauth-server/oauth/token',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/signup',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/registeration/confirm/**',
        'http://localhost:8082/ibexapp/oauth-resource/ibex/api/user/profile/upload'
    ]
    constructor(public auth : AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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