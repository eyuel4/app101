import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../shared/service/api/message.service';
import { ResponseMessage } from '../../shared/http_entities/response_message.model';

@Component({
    selector: 'app-message-notification',
    templateUrl: './message_notification.component.html',
    styleUrls: ['./message_notification.component.scss']
})
export class MessageNotificationComponent implements OnInit {
    public message: string;
    public respMessage : ResponseMessage;
    public type : string;

    constructor(private messageNotifService : MessageService) {}

    ngOnInit() {
      console.log("Am hreee");
          this.messageNotifService.currentMessage.subscribe(
            (resp : ResponseMessage) => {
              if (resp.success === true) {
                console.log("Success is true");
                this.message = resp.message;
                this.respMessage = resp;
              }
              else {
                console.log("Success is false");
                this.message = resp.error;
                this.respMessage = resp;
                this.type = resp.message_type;
                console.log(resp);
                console.log(resp.message_type + " Type");
              }

            },
            (err: Error) => {
              console.log(err + "Error Occured");
            },
            () => { }
          );
    }


}