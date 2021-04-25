import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Episode } from "../models/episode.type";
import { Season } from "../models/season.type";
import { ShowDetails } from "../models/show-details.type";
import { CommonService } from "./common.service";

@Injectable()
export class ShowService{
  BASE_URL = "shows"
  constructor(private commonService: CommonService) {}

   /**
   * Gets the details of the show with the given ID
   * @param ID - The show's ID
   * @returns - The Obsevable of the show's details
   */
  getShowById(ID: number): Observable<ShowDetails>  {
      return this.commonService.getRequest(`${this.BASE_URL}/${ID}?extended=full`)
      .pipe(
        map((response) => {
          const body = response.body as ShowDetails
          return body
        })
      )
  }

  /**
   * Gets the seasons of the show with the given ID
   * @param ID - The ID of the show to get the seasons for
   * @returns - An Observable of the shows's seasons
   */
  getSeasonsForShowByID(ID: number): Observable<Season[]> {
    return this.commonService.getRequest(`${this.BASE_URL}/${ID}/seasons?extended=episodes`)
    .pipe(
      map((response) => {

        const body = response.body as Season[]
        return body.filter(season => season.number > 0)
    }))
  }
}
