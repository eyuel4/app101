import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppConfig } from  '../../config/app.config';
import { ApiRequestService } from '../../shared/service/api/api-request.service';


@Component({
    selector: 'app-account-confirmation',
    templateUrl:'./account_confirmation.component.html',
    styleUrls: ['./account_confirmation.component.html']
})
export class AccountConfirmationComponent implements OnInit {
    private confirmationToken : string;

    constructor(private route : ActivatedRoute,
                private apiRequest : ApiRequestService) {}

    ngOnInit() {
        // subscribe to the parameters observable
        this.route.params.subscribe(
            (params) => {
                this.confirmationToken = params.token;
                console.log(this.confirmationToken);
        })
    }

    confirmAccount() {
        this.apiRequest.post(AppConfig.api_endpoints.confirm_account, this.confirmationToken, AppConfig.server_type.resource_server)
            .subscribe(
                (jsonResp) => {
                    console.log(jsonResp);
                    // If the user account is confirmed 
                    // show thank you message
                    // else show the error depending on the response from backend
                }
            )
    }
}