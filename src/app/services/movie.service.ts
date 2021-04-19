import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MovieDetails } from "../models/movie.type";
import { CommonService } from "./common.service";

@Injectable()
export class MovieService{
  BASE_URL = "movies"
  constructor(private commonService: CommonService) {}

  getMovieById(ID: number): Observable<MovieDetails>  {
      return this.commonService.getRequest(`${this.BASE_URL}/${ID}?extended=full`)
      .pipe(
        map((response) => {
          const body = response.body as MovieDetails
          return body
        })
      )
  }

  getPeopleForMovieById(ID: number) {
    return this.commonService.getRequest(`${this.BASE_URL}/${ID}/people`);
  }
}
