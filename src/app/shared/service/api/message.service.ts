import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ResponseMessage } from '../../../shared/http_entities/response_message.model';

@Injectable()
export class MessageService {
    public message : ResponseMessage;
    public currentMessage : Subject<ResponseMessage> = new Subject<ResponseMessage>();

    constructor() {}

    public setMessage(respMessage : ResponseMessage) {
        this.message = respMessage;
        console.log(this.message);
        this.currentMessage.next(respMessage);
    }

}