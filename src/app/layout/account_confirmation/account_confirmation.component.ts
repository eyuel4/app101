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
                this.confirmAccount(this.confirmationToken);
        })
    }

    confirmAccount(token : string) {
        let url : string = AppConfig.api_endpoints.confirm_account +"/"+token;
        console.log(url + "End Url");
        this.apiRequest.get(url,AppConfig.server_type.resource_server)
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