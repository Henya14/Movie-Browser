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

  /**
   * Gets the details of the person with the given ID
   * @param ID - The ID of the person to get the details for
   * @returns - An Observable of the person's details
   */
  getPersonById(ID: number): Observable<PeopleDetails>  {
      return this.commonService.getRequest(`${this.BASE_URL}/${ID}?extended=full`)
      .pipe(
        map((response) => {
          return response.body as PeopleDetails
        })
      )
  }

  /**
   * Gets the movies of the person with the given ID
   * @param ID - The ID of the person to get the movies for
   * @returns - An Observable of the persons' movies
   */
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
