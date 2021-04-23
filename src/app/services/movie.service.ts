import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CastMember } from "../models/castmember.type";
import { MovieDetails } from "../models/movie.type";
import { CommonService } from "./common.service";




interface PeopleResponse {
  cast: CastMember[]
}
@Injectable()
export class MovieService{
  BASE_URL = "movies"
  constructor(private commonService: CommonService) {}


  getMovieById(ID: number): Observable<MovieDetails>  {
      return this.commonService.getRequest(`${this.BASE_URL}/${ID}?extended=full`)
      .pipe(
        map((response) => {
          return response.body as MovieDetails
        })
      )
  }

  getCastForMovieById(ID: number): Observable<CastMember[]> {
    return this.commonService.getRequest(`${this.BASE_URL}/${ID}/people`)
    .pipe(
      map((response) => {
          const body = response.body as PeopleResponse
          return body.cast
      })
    )
  }
}
