import { Component, OnInit } from '@angular/core';

import { UserInfoService } from '../app/auth/user_info.service';
import { MessageService } from './shared/service/api/message.service';
import { ResponseMessage } from './shared/http_entities/response_message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  message : string = null;

  constructor(private userInfoService : UserInfoService,
              private messageNotifiService : MessageService ) {}

  ngOnInit() {
    this.userInfoService.isLoggedIn();
    this.messageNotifiService.currentMessage.subscribe(
      (resp : ResponseMessage) => {
        if (resp.success === false) {
          this.message = resp.error;
        }
        else {
          this.message = resp.message;
        }

      },
      (err: Error) => {
        console.log(err);
      },
      () => { }
    );
  }

}
