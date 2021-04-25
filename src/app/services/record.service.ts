import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDS } from '../models/ID.type';
import { Record, RecordType } from '../models/record.type';
import { CommonService } from './common.service';


export interface RequestResponse {
  title: string;
  year: number;
  ids: IDS;
  watchers?: number;
}

interface Watchers {
  watchers?: number;
}

interface ShowResponse extends Watchers {
  show: RequestResponse;
}

interface MovieResponse extends Watchers {
  movie: RequestResponse;
}

export interface RecordRequestResponse {
  records: Record[];
  pages: number;
}

export enum SearchAfterType {
  Title = 'Title',
  Overview = 'Overview',
  People = 'People',
  Aliases = 'Aliases',
}

@Injectable()
export class RecordService {
  SEARCH_BASE_URL = 'search';
  constructor(private commonService: CommonService) {}

  /**
   * Gets the currently trending movies, at the given page with the given page size
   * @param pageSize - Sets how many records should be on a page
   * @param page - Which page of the trending movies should be retrieved
   * @returns - An Observable of the trending movies at the given page
   */
  getTrendingMovies(
    pageSize: number = 4,
    page: number = 1
  ): Observable<RecordRequestResponse> {
    return this.getRecords(pageSize, page, 'movies', 'trending');
  }

  /**
   * Gets the currently popular movies, at the given page with the given page size
   * @param pageSize - Sets how many records should be on a page
   * @param page - Which page of the popular movies should be retrieved
   * @returns - An Observable of the popular movies at the given page
   */
  getPopularMovies(
    pageSize: number,
    page: number
  ): Observable<RecordRequestResponse> {
    return this.getRecords(pageSize, page, 'movies', 'popular');
  }

  /**
   * Gets the currently trending shows, at the given page with the given page size
   * @param pageSize - Sets how many records should be on a page
   * @param page - Which page of the trending shows should be retrieved
   * @returns - An Observable of the trending shows at the given page
   */
  getTrendingShows(
    pageSize: number,
    page: number
  ): Observable<RecordRequestResponse> {
    return this.getRecords(pageSize, page, 'shows', 'trending');
  }

  /**
   * Gets the currently popular shows, at the given page with the given page size
   * @param pageSize - Sets how many records should be on a page
   * @param page - Which page of the popular shows should be retrieved
   * @returns - An Observable of the popular shows at the given page
   */
  getPopularShows(
    pageSize: number,
    page: number
  ): Observable<RecordRequestResponse> {
    return this.getRecords(pageSize, page, 'shows', 'popular');
  }

  private getRecords(
    pageSize: number,
    page: number,
    base_url: string,
    additionalURL: string
  ): Observable<RecordRequestResponse> {
    let records: Record[] = [];
    let pages: number = 0;

    const result: RecordRequestResponse = {
      records: records,
      pages: pages,
    };
    return this.commonService
      .getRequest(`${base_url}/${additionalURL}?page=${page}&limit=${pageSize}`)
      .pipe(
        map((response: HttpResponse<Object>) => {
          result.pages = Number(
            response.headers.get('x-pagination-page-count')
          );
          if (additionalURL === 'trending') {
            if (base_url === 'movies') {
              const body = response.body as MovieResponse[];

              body.forEach((r) =>
                result.records.push({
                  type: RecordType.Movie,
                  ...r.movie,
                  watchers: r.watchers,
                })
              );
            } else {
              const body = response.body as ShowResponse[];

              body.forEach((r) =>
                result.records.push({
                  type: RecordType.Show,
                  ...r.show,
                  watchers: r.watchers,
                })
              );
            }

            return result;
          } else {
            const type =
              base_url === 'movies' ? RecordType.Movie : RecordType.Show;
            const body = response.body as RequestResponse[];
            body.forEach((r) => result.records.push({ type: type, ...r }));
            return result;
          }
        })
      );
  }

  /**
   * Gets the search results for the given search term at the given page
   * @param term - The term to search for
   * @param pageSize - Sets how many records should be on a page
   * @param page - Which page of the search results should be retrieved
   * @param type - The type of the search (Could be show or movie search)
   * @param fields - The fields on which the search will run on
   * @returns - An Observable of the search results
   */
  getSearchResults(
    term: string,
    pageSize: number,
    page: number,
    type: RecordType,
    fields?: SearchAfterType[]
  ): Observable<RecordRequestResponse> {
    let movieshows: Record[] = [];
    let pages: number = 0;

    const result: RecordRequestResponse = {
      records: movieshows,
      pages: pages,
    };

    const fieldsQuery = `fields=${
      fields ? fields.join(',') : SearchAfterType.Title
    }`;
    return this.commonService
      .getRequest(
        `search/${type}?page=${page}&limit=${pageSize}&${fieldsQuery}&query=${term}`
      )
      .pipe(
        map((response: HttpResponse<Object>) => {
          result.pages = Number(
            response.headers.get('x-pagination-page-count')
          );
          if (type === RecordType.Movie) {
            const body = response.body as MovieResponse[];
            body.splice(pageSize);
            body.forEach((r) =>
              result.records.push({
                type: RecordType.Movie,
                ...r.movie,
              })
            );
          } else {
            const body = response.body as ShowResponse[];
            body.splice(pageSize);
            body.forEach((r) =>
              result.records.push({
                type: RecordType.Show,
                ...r.show,
              })
            );
          }
          return result;
        })
      );
  }
}
