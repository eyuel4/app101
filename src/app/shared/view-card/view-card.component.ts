import { Component, Input, OnInit } from '@angular/core';

import { Movies } from '../model/movie/Movies.model';
import { User } from '../model/common/User.model';

@Component({
    selector:'app-viewcard',
    templateUrl: './view-card.component.html',
    styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {
    @Input('movieItem') movie : Movies;
   // @Input() user : User;
    constructor() {

    }

    ngOnInit() {
        console.log(this.movie.description);
       // console.log(this.user.email);
    }
}