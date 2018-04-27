import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    // Application Config for the full APP

    public version: string = "1.0.0";
    public locale: string = "en-US";
    public dateFormat = { year:'numeric', month: 'short', day: 'numeric'};

    // API Related configs
    public apiPort: string = "";
    public apiProtocol : string;
    public apiHostName : string;
    public baseApiPath : string = "http://localhost:4200";


}