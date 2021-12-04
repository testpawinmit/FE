import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, retry, shareReplay, tap} from 'rxjs/operators';
import {StorageService} from "./storage.service";
import {WebrequestService} from "./webrequest.service";
import {environment} from "../../environments/environment.prod";
import {API_CONST} from "../core/const";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseURL;

  constructor(private router:Router,
              private store: StorageService,
              private api: WebrequestService,
              private http:HttpClient) { }

  setAccessToken(AccessToken: string) {
    return this.store.setItem('x-access-token', AccessToken);
    //  localStorage.setItem('x-access-token', AccessToken);
  }
  getAccessToken() {
    return this.store.getItem('x-access-token');
  }
  getrefreshToken() {
    return this.store.getItem('x-refresh-token');
  }
  getNewAccessToken() {
    return this.http.get(`${environment.baseURL}/${API_CONST.PATH_REFRESH_TOKEN}`, {
      headers: {
        'Authorization': 'Bearer ' + this.getrefreshToken(),
        'Content-Type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('token'));
      })
    )
  }

  isAuthenticated() {
    const token = this.store.getItem('x-access-token');
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  private removeSession() {

    this.store.clearStore();
    ///  localStorage.removeItem('user-id');
    /// localStorage.removeItem('x-access-token');
    ///localStorage.removeItem('x-refresh-token');

  }

  logout() {
    this.removeSession();
    this.router.navigate(['auth/login']);

  }

  login(username: string, password: string, appTypeCode: string, machine: string) {
    return this.api.login(username, password, appTypeCode, machine).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // auth tokens will be handled there
        if (res.body.response === 'Ok') {
          this.setSession(res.body._id, res.body.token, res.body.refreshToken, res.body.userRole);
          localStorage.setItem("username", res.body.username);
          localStorage.setItem("userRole", res.body.userRole);
        }

      })
    )
  }

  private setSession(userId: string, accessToken: string, refreshToken: string, userRole: string) {
    this.store.setItem('user-id', userId);
    this.store.setItem('x-access-token', accessToken);
    this.store.setItem('x-refresh-token', refreshToken);
    this.store.setItem('userRole', userRole);

    //  localStorage.setItem('user-id', userId);
    //  localStorage.setItem('x-access-token', accessToken);
    //  localStorage.setItem('x-refresh-token', refreshToken);

  }

  public async validLogin() {

    let token = localStorage.getItem('x-access-token');
    let refreshToken = localStorage.getItem('x-refresh-token');
    let username = localStorage.getItem('username');

    let isValidLogin = true;

    return isValidLogin;
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
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

  // register as a user
  register(item: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
