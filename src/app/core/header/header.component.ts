import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.scss']
})
export class HeaderComponent {
    isAuthenticated: boolean;

    constructor(private oktaAuth: OktaAuthService) {

    }

    async ngOnInit() {
        this.isAuthenticated = await this.oktaAuth.isAuthenticated();
        // Subscribe to authentication state changes
        this.oktaAuth.$authenticationState.subscribe(
            (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
        );
    }
}