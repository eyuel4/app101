import { Component, Input } from '@angular/core';

import { Movies } from '../model/movie/Movies.model';


@Component({
    selector:'app-viewcard',
    templateUrl: './view-card.component.html',
    styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent {
    @Input() movie : Movies;

    constructor() {

    }

    // getItemImage() : string {
    //     console.log(this.movie.photo.url);
    //     console.log(this.movie.photo.photo_name);
    //    return  this.movie.photo.url;
    // }
}