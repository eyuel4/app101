import { Component, OnInit, Input } from '@angular/core';
import { Movies } from "../../../shared/model/movie/Movies.model";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input('movieItem') movie: Movies;
  
  constructor() { }

  ngOnInit() {
  }

}
