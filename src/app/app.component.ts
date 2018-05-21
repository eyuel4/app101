import { Component, OnInit } from '@angular/core';

import { UserInfoService } from '../app/auth/user_info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private userInfoService : UserInfoService) {}

  ngOnInit() {
    this.userInfoService.isLoggedIn();
    
  }

}
