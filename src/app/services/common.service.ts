import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }
  BASE_URL: string = "http://api.trakt.tv"
  CLIENT_ID: string = "a6ab3de7bf53fff0d99fcebf70a092ef8a85e22fa9d9b9b0aa5c84e8bbe2ff8f"
  HEADER = new HttpHeaders()
  .set('Content-type', 'application/json')
  .set('trakt-api-key', this.CLIENT_ID)
  .set('trakt-api-version', '2');

  /**
   * Makes an HTTP GET request and returns the whole response
   * @param url - The url to which the GET request will be sent
   * @returns - the response to the GET request
   */
  getRequest(url: string): Observable<HttpResponse<Object>> {
    return this.http.get(`${this.BASE_URL}/${url}`, {
      headers: this.HEADER,
      observe: 'response',
      responseType: 'json'
    })
  }
}
