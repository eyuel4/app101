import { Component, OnInit } from '@angular/core';
import { Movies } from "../../shared/model/movie/Movies.model";
import { Photo } from "../../shared/model/common/Photo.model";
import { MovieService } from "../../shared/service/movie.service";
import { UserInfoService } from '../../auth/user_info.service';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
    movies : Movies[] = [];
    // movies : Movies[] = [
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     ),
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     ),
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     ),
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     ),
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     ),
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     ),
    //     new Movies(
    //         100,
    //         'Harry Potter',
    //         'Good movie',
    //         new Photo(12, 'HarryPotter', 'https://static.boredpanda.com/blog/wp-content/uploads/2016/01/16-year-old-artist-dimitra-milan-1.jpg')
    //     )
    // ]

    constructor(private movieService: MovieService,
                private userInfoService: UserInfoService) {}

    ngOnInit() {
        console.log(this.movies);
        console.log("Hello World");

        this.userInfoService.isLoggedIn();
        this.movieService.getMovies()
            .subscribe(
                (movies: Movies[]) => {
                    console.log("hello world");
                    console.log(movies);
                    this.movies = movies;
                }
            )
    }
}