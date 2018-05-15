import { Component, OnInit } from '@angular/core';

import { Movies } from '../../shared/model/movie/Movies.model';
import { MoviesService } from '../../shared/service/movies.service';
import { Photo } from '../../shared/model/common/Photo.model';
import { User } from '../../shared/model/common/User.model';
import { UserInfoService } from '../../auth/user_info.service';
@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent implements OnInit {
    movies : Movies[];
    //xs : Movies;
    //user : User;

    constructor(private moviesService : MoviesService,
                private userInfoService : UserInfoService) {
       // this.movies = new Array();
       // this.xs  = new Movies(100,'Harry Potter','Good movie',new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg'));
       // this.xs = new Movies();
       // this.xs.movieId = 100;
        // this.xs.photo = new Photo(100,'moviepic','https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg');
        // this.xs.photo.photo_name= 'Movie Pic';
        // this.xs.photo.url = 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg';
        //this.xs.description = 'Hello World';
        //this.xs.title = 'Harry Potter';
        //this.movies.push(this.xs);
        //this.user = new User();
        //this.user.email = 'eyuel4';
    }
    // gettitle() : string {
    //     console.log(this.movies[0].title);
    //    return this.movies[0].title;
    // }

    ngOnInit() {
        this.userInfoService.isLoggedIn();
        this.movies = this.moviesService.getMovies();
    }
}