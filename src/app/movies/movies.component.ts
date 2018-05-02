import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    constructor(private router : Router, private route : ActivatedRoute) {

    }

    ngOnInit() {
        //this.router.navigate(['./list'],{relativeTo: this.route})
    }

}