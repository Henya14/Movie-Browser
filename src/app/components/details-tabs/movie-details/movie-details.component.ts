import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails} from 'src/app/models/movie.type';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  movie? : MovieDetails
  ngOnInit(): void {
    this.route.params.subscribe( params => {

      let movieId = +params['id']
      this.movieService.getMovieById(movieId).subscribe(response => {
        console.log(response)
        this.movie=response
      })
    })
  }

}
