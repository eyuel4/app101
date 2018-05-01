import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from "../../../config/app-config";
import { UserInfoService } from '../../../auth/user_info.service';
import { Router } from '@angular/router';
import { User } from '../../model/common/User.model';

@Injectable()
export class ApiRequestService {

    constructor(private appConfig : AppConfig,private http: HttpClient,
                private router : Router, private userInfoService : UserInfoService) {}

    /**
     * This is a Global place to add all the request headers for every REST calls
     */
    getHeaders() :HttpHeaders {
        let headers = new HttpHeaders();
        let token = this.userInfoService.getStoredToken();
        headers = headers.append('Content-Type', 'application/json');
        if (token !== null) {
            headers = headers.append("Authorization", token);
        }
        return headers;
    }

    get(url:string, serverType: string, urlParams?: HttpParams) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
        let me  = this;
        return this.http.get(baseApiPath + url, {headers : this.getHeaders(), params:urlParams} )
            .catch(function(error : any) {
                console.log("Some error in catch");
                if (error.status === 401 || error.status === 403) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    post(url: string, body:Object, serverType: string) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
        let me = this;
        return this.http.put(baseApiPath + url, JSON.stringify(body), { headers:this.getHeaders()})
            .catch(function(error:any){
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    postForToken(url: string, body:Object, serverType: string) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
        let me = this;
        let myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');
        myHeader.append('Authorization', 'Basic ' + btoa('fooClientIdPassword:secret'));

        let params = new HttpParams()
                     .set('grant_type','password')
                     .set('username','john')
                     .set('password','123');

        return this.http.post(baseApiPath + url, JSON.stringify(body), { headers: myHeader, params: params})
            .catch(function(error:any){
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    delete(url:string, serverType: string) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
        let me  = this;
        return this.http.delete(baseApiPath + url, { headers:this.getHeaders()})
            .catch(function(error:any){
                if (error.status === 401) {
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    getBaseApiPath(serverType : string) : string {
        let baseApiPath : string;

        if(serverType === "authorization") {
            baseApiPath = this.appConfig.baseApiPathAuthServer;
        }
        else if (serverType === "resource") {
            baseApiPath = this.appConfig.baseApiPathResourceServe;   
        }
        else {
            baseApiPath = this.appConfig.baseApiPathUIServer;
        }

        return baseApiPath;
    }
}