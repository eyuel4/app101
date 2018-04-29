import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private oktaAuth: OktaAuthService) {

    }

 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.fromPromise(this.handleAccess(request, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        // Only add to known domains since we don't want to send our tokens to just anyone.
        if (request.urlWithParams.indexOf('localhost') > -1) {
            const accessToken = await this.oktaAuth.getAccessToken();
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ` + accessToken
                }
            });
        }
        return next.handle(request).toPromise();
    }
}