import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../modal/customer';
import { catchError, retry } from 'rxjs/operators';
import { Pet } from '../modal/pet';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = environment.baseURL;
  myToken = localStorage.getItem('x-access-token');

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('x-access-token')
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
  createItem(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingCustomer', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });
  }

  // Create a new item
  createAllergy(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingAllergy', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });
  }

  // Create a new item
  createDisabilities(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingDisabilities', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });


  }

  // Create a new item
  createInjury(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingInjury', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });


  }

  // Create a new item
  createMedication(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingMedication', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });

  }


  // Create a new item
  createDietary(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<Customer>(this.baseUrl + '/creatingDietary', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });

  }

  // Create a new item
  addVaccination(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/addingVaccinations', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );

    });

  }

  // Create a new item
  addPet(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/addingPet', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  // Get customer data
  getCustomer(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingCustomer', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  // Get customer data
  getPets(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingPets', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getAllergies(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingAllergies', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getDisabilities(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingDisabilities', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getInjuries(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingInjuries', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getMedications(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingMedications', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getAppointment(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingAppointment', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  updateAppointmentStatus(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/updatingAppointmentStatus', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getAppointmentByService(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingAppointmentByService', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getFeedingReport(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingFeedingReport', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getMedicationReport(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingMedicationReport', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getCheckInReport(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingCheckInReport', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getCheckOutReport(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingCheckOutReport', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getRevenueReport(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingRevenueReport', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getVaccination(): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .get<any>(this.baseUrl + '/gettingVaccination', this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getSingleVaccination(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/gettingSingleVaccination', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  updateItem(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/updatingItem', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  getAllCustomers(): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .get<any>(this.baseUrl + '/gettingAllCustomers', this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

  deleteItem(item): Promise<Observable<any>> {

    return this.auth.validLogin().then(result => {

      return this.http
        .post<any>(this.baseUrl + '/deletingItem', JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    });
  }

}
