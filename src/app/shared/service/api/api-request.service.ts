import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from "../../../config/app-config";
import { UserInfoService } from '../../../auth/user_info.service';
import { Router } from '@angular/router';
import { User } from '../../model/common/User.model';
import { Base64 } from 'js-base64';
import {LoginRequestParam} from './login.service';

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
                    console.log("Logging out1");
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    post(url: string, body:Object, serverType: string) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
        let me = this;
        return this.http.post(baseApiPath + url, JSON.stringify(body), { headers:this.getHeaders()})
            .catch(function(error:any){
                if (error.status === 401) {
                    console.log("Logging out");
                    me.router.navigate(['/logout']);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    postForToken(url: string, body:LoginRequestParam, serverType: string) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
    
        //let authUrl = 'http://localhost:8081/ibextubeapp/oauth-server/oauth/token';
        let me = this;
        // let myHeader = new HttpHeaders();
        // myHeader.append('Content-Type', 'application/json');
        // myHeader.append('Authorization', 'Basic ' + btoa('fooClientIdPassword:secret'));
        const myHeader = new HttpHeaders({
            'Content-Type' : 'application/json; charset=utf-8',
            'Authorization' : 'Basic ' + Base64.encode('fooClientIdPassword:secret')
        });
        let params = new HttpParams()
                     .set('username',body.username)
                     .set('password',body.password)
                     .set('grant_type','password');
        console.log("Request out :" +baseApiPath + url);             
        return this.http.post(baseApiPath + url, null, { headers: myHeader, params: params})
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