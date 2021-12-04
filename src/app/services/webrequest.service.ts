import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {API_CONST} from "../core/const";

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://123.231.9.43:2008/hris/web';

  }


  get(uri: string) {
    return this.http.get(`${environment.baseURL}/${uri}`);
  }

  getFromExternal(uri: string) {
    return this.http.get(uri);
  }
  post(uri: string, payload: Object) {
    return this.http.post(`${environment.baseURL}/${uri}`, payload);

    // return this.http.post(`${API_CONST.API_TEST_URL}/${uri}`, payload);
  }

  login(username: string, password: string, apptypeCode: string, machine: string) {
    return this.http.post(`${environment.baseURL}/${API_CONST.PATH_LOGIN_API}`, {
      "username": username,
      "password": password,
      "machine": machine,
      "appTypeCode": apptypeCode

    }, { observe: 'response' });
  }



  test(uri: string, code) {
    return this.http.post(`${environment.baseURL}/${uri}`,
      code
      , { observe: 'response' });
  }
}
