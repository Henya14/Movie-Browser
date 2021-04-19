import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { Observable, throwError } from 'rxjs';
import {IDS, Record, RecordType } from "../models/record.type";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";


export interface RequestResponse {
  title: string
  year: number
  ids: IDS
  watchers?: number
}

interface Watchers {
  watchers?: number
}

interface ShowResponse extends Watchers {
  show: RequestResponse
}

interface MovieResponse extends Watchers {
  movie: RequestResponse
}


export interface RecordRequestResponse {
  records: Record[]
  pages: number
}



export enum SearchAfterType {
  Title = "Title",
  Overview = "Overview",
  People = "People",
  Aliases = "Aliases"
}

@Injectable()
export class RecordService {

  SEARCH_BASE_URL = "search"
  constructor(private commonService: CommonService) {}
  getTrendingMovies(pageSize: number, page: number): Observable<RecordRequestResponse>{
    return this.getRecords(pageSize, page, "movies","trending")
  }

  getPopularMovies(pageSize: number, page: number) {
    return this.getRecords(pageSize, page,"movies", "popular")
  }

  getTrendingShows(pageSize: number, page: number): Observable<RecordRequestResponse>{
    return this.getRecords(pageSize, page, "shows","trending")
  }

  getPopularShows(pageSize: number, page: number) {
    return this.getRecords(pageSize, page,"shows", "popular")
  }


  private getRecords(pageSize: number, page: number, base_url: string, additionalURL: string) {
    let records: Record[] = []
    let pages: number = 0

    const result: RecordRequestResponse  = {
      records: records,
      pages: pages
    }
    return this.commonService.getRequest(`${base_url}/${additionalURL}?page=${page}&limit=${pageSize}`)
    .pipe(map((response: HttpResponse<Object>) => {
          result.pages = Number(response.headers.get('x-pagination-page-count'))
          if(additionalURL === "trending"){
            if(base_url === "movies") {
              const body = response.body as MovieResponse[]

              body.forEach(r => result.records.push({
                type: RecordType.Movie,
                ...r.movie,
                watchers: r.watchers
              }))
            } else {
              const body = response.body as ShowResponse[]

              body.forEach(r => result.records.push({
                type: RecordType.Show,
                ...r.show,
                watchers: r.watchers
              }))
            }

            return result;
          } else {
            const type = base_url === "movies"? RecordType.Movie: RecordType.Show
            const body = response.body as RequestResponse[]
            body.forEach(r => result.records.push({type: type,
              ...r}))
            return result
          }
      }))
  }

  getSearchResults(term:string, pageSize: number, page: number, type:RecordType, fields?: SearchAfterType[]) {

    let movieshows: Record[] = []
    let pages: number = 0

    const result: RecordRequestResponse  = {
      records: movieshows,
      pages: pages
    }

    const fieldsQuery = `fields=${fields? fields.join(','): SearchAfterType.Title}`
    return this.commonService.getRequest(`search/${type}?page=${page}&limit=${pageSize}&${fieldsQuery}&query=${term}`)
    .pipe(map((response: HttpResponse<Object>) => {
            result.pages = Number(response.headers.get('x-pagination-page-count'))
            if(type === RecordType.Movie) {
              const body = response.body as MovieResponse[]
              body.splice(pageSize)
              body.forEach(r => result.records.push({
                type: RecordType.Movie,
                ...r.movie}))
            } else {
              const body = response.body as ShowResponse[]
              body.splice(pageSize)
              body.forEach(r => result.records.push({
                type: RecordType.Show,
                ...r.show}))
            }
            return result
      }))
  }

}
