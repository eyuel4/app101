import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, 
         HttpHandler, 
         HttpEvent, 
         HttpRequest } from '@angular/common/http';


export class JwtInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpResponse) {
                if (err.status === 401) {
                    // redirect to login route
                    // or show a modal
                }
            }
        });
    }
}