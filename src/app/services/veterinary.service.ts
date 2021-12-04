import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, throwError} from "rxjs";
import {Customer} from "../modal/customer";
import {catchError, retry} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  baseUrl = environment.baseURL;
  myToken = localStorage.getItem('x-access-token');

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('x-access-token')
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Create a new item
  createVeterinary(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingVeterinary', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )

    });
  }

  getVeterinary(): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .get<any>(this.baseUrl + '/gettingVeterinary', this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    });
  }

  updateItem(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/updatingItem', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    });
  }

}
