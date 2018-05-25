import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Base64 } from 'js-base64';

//import { AppConfig } from "../../../config/app-config";
import { AppConfig } from '../../../config/app.config'
import { UserInfoService } from '../../../auth/user_info.service';
import { User } from '../../model/common/User.model';
import {LoginRequestParam} from './login.service';
import { MessageService } from '../api/message.service';
import { ResponseMessage } from '../../http_entities/response_message.model';

@Injectable()
export class ApiRequestService {

    constructor(private http: HttpClient,
                private router : Router, 
                private userInfoService : UserInfoService,
                private messageService : MessageService) {}

    /**
     * This is a Global place to add all the request headers for every REST calls
     */
    getHeaders() :HttpHeaders {
        let headers = new HttpHeaders();
        let token = this.userInfoService.getStoredToken();
        headers = headers.append('Content-Type', 'application/json');
        if (token !== null) {
            headers = headers.append(AppConfig.server_type.authorization_server, token);
        }
        return headers;
    }

    get(url:string, serverType: string, urlParams?: HttpParams) : Observable<any> {
        let baseApiPath : string = this.getBaseApiPath(serverType);
        console.log(baseApiPath);
        console.log(url);
        console.log(baseApiPath + url);
        let me  = this;
        return this.http.get(baseApiPath + url, {headers : this.getHeaders(), params:urlParams} )
            .catch(function(error : any) {
                console.log("Some error in catch");
                console.log(error);
                if (error.status === 401 || error.status === 403) {
                    console.log("Logging out1");
                    me.router.navigate([AppConfig.navigation_endpoints.logout]);
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
                    me.router.navigate([AppConfig.navigation_endpoints.logout]);
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
            'Authorization' : 'Basic ' + Base64.encode(AppConfig.oauth_info.clientId+':'+AppConfig.oauth_info.clientPassword)
        });

        let params = new HttpParams()
                     .set('username',body.username)
                     .set('password',body.password)
                     .set('grant_type','password');
        console.log("Request out :" +baseApiPath + url);   
        console.log(params);          
        return this.http.post(baseApiPath + url, null, { headers: myHeader, params: params})
            .catch(function(error:any){
                console.log(error);
                if (error.status === 401) {
                    me.router.navigate([AppConfig.navigation_endpoints.logout]);
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
                    me.router.navigate([AppConfig.navigation_endpoints.logout]);
                }
                return Observable.throw(error || 'Server error')
            });
    }

    getBaseApiPath(serverType : string) : string {
        let baseApiPath : string;
        console.log(serverType +' server type');

        if(serverType === AppConfig.server_type.authorization_server) {
            baseApiPath = AppConfig.api_server_path.baseApi_AuthServer;
            console.log(baseApiPath);
        }
        else if (serverType === AppConfig.server_type.resource_server) {
            baseApiPath = AppConfig.api_server_path.baseApiPathResourceServer;  
            console.log(baseApiPath); 
        }
        else {
            baseApiPath = AppConfig.api_server_path.baseApiPathUIServer;
            console.log(baseApiPath);
        }

        return baseApiPath;
    }
}