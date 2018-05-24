import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { AppConfig } from  '../../config/app.config';
import { ApiRequestService } from '../../shared/service/api/api-request.service';
import { UserInfoService } from '../../auth/user_info.service';
import { ResponseMessage } from '../../shared/http_entities/response_message.model';
import { MessageService } from '../../shared/service/api/message.service';

@Component({
    selector: 'app-account-confirmation',
    templateUrl:'./account_confirmation.component.html',
    styleUrls: ['./account_confirmation.component.html']
})
export class AccountConfirmationComponent implements OnInit {
    private confirmationToken : string;

    constructor(private route : ActivatedRoute,
                private router : Router,
                private apiRequest : ApiRequestService,
                private userInfoService : UserInfoService,
                private messageService : MessageService ) {}

    ngOnInit() {
        // subscribe to the parameters observable
        this.route.params.subscribe(
            (params) => {
                this.confirmationToken = params.token;
                console.log(this.confirmationToken);
                this.confirmAccount(this.confirmationToken);
        })
    }

    confirmAccount(token : string) {
        let url : string = AppConfig.api_endpoints.confirm_account +"/"+token;
        console.log(url + "End Url");
        this.apiRequest.get(url,AppConfig.server_type.resource_server)
            .subscribe(
                (jsonResp : ResponseMessage) => {
                    console.log(jsonResp + " hello");
                    this.messageService.setMessage(jsonResp);
                    // If the user account is confirmed 
                    // show thank you message
                    // else show the error depending on the response from backend

                    this.router.navigate([AppConfig.navigation_endpoints.home]);
                },
                (error : any) => {
                    console.log(error.status + " Error thrown");
                     if (error.status === 412) {
                        console.log(error.error.message);
                        let responseMessage = new ResponseMessage(false, error.error.message,
                                                                 error.error.message,error.status, 
                                                                 AppConfig.message_type.message_error);
                        this.messageService.setMessage(responseMessage);
                        console.log("Am back");
                        this.router.navigate([AppConfig.navigation_endpoints.home]);
                    }
                }

            )
    }
}