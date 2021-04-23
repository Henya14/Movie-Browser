import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { PeopleDetails } from "../models/people.type"
import { Record } from "../models/record.type"
import { CommonService } from "./common.service"


interface PeopleMoviesResponse {
  cast: {movie: Record}[]
}

@Injectable()
export class PeopleService{
  BASE_URL = "people"
  constructor(private commonService: CommonService) {}



  getPersonById(ID: number): Observable<PeopleDetails>  {
      return this.commonService.getRequest(`${this.BASE_URL}/${ID}?extended=full`)
      .pipe(
        map((response) => {
          return response.body as PeopleDetails
        })
      )
  }

  getPersonsMoviesById(ID: number): Observable<Record[]> {
    return this.commonService.getRequest(`${this.BASE_URL}/${ID}/movies`)
    .pipe(
      map((response) => {
        const movies: Record[] = []
        const body = response.body as PeopleMoviesResponse
        body.cast.forEach(role => {
          movies.push(role.movie)
        })
        return movies
      })
    )
  }
}
