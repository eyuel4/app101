import { Injectable } from '@angular/core';

import { ApiRequstService } from './api-request.service';

@Injectable()
export class LoginService {
    constructor(private apiRequest : ApiRequestService) {}
}