import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';


import {JsonPipe} from '@angular/common';
import {AppUser} from '../models/app-user';
import {SecurityService} from './security.service';
import {AppUserWithAuth} from '../models/app-user-with-auth';
import {Url} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private security: SecurityService) {
  }


  get CurrentUser() {
    return this.security.SecurityObject.user;
  }

  get SecurityService() {
    return this.security.SecurityObject;
  }

  Url = Url;
  //Url = 'https://householdapi.herokuapp.com/api/';
  //Url= 'http://localhost:3000/api/';
  countryApi = 'https://restcountries.eu/rest/v2/all';
  headerType = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),

  };


  public errorModel: any;

// To register an user to DB
  RegisterUser(user: any): Observable<any> {

    if (user.Username != null) {
      return this.http.post<AppUser>(
        this.Url + 'User/Register',
        user,
        this.headerType
      ).pipe(
        catchError(this.handleError<AppUser>('RegisterUser'))
      );
    }
  }

// For getting user on the user with emailId
  GetUserByEmail(email: string): Observable<AppUser[]> {

    return this.http.get<AppUser[]>(this.Url + 'getall');
  }

// For Logging user in and getting back token

  LoginUser(user: AppUser): Observable<any> {

    if (user != null || user !== undefined) {
      return this.http.post<AppUser>(this.Url + 'User/Login',
        {Email: user.Email, Password: user.Password});

    }

  }


  Logout(): void {
    this.security.logOut();

  }

  User(user: AppUserWithAuth, guard = false) {

    const condition = guard ? user.Role : user.user.Role

    switch (condition) {
      case 'Admin':
        this.Admin(user, guard);
        break;
      case 'Worker':
        this.Worker(user, guard);
        break;
      case 'Customer':
        this.Customer(user, guard);
        break;
      default:
        this.Customer(user, guard);
    }

  }


  AmIAuthenticated(): boolean {
    if (this.security.isauthenticated()) {
      return true;
    }
    return false;
  }

  private Worker(user: AppUserWithAuth, guard) {
    // tslint:disable-next-line:no-unused-expression
    this.security.SetWorker(user, guard);
  }

  private Customer(user: AppUserWithAuth, guard) {
    // tslint:disable-next-line:no-unused-expression
    this.security.SetCustomer(user, guard);
  }

  private Admin(user: AppUserWithAuth, guard) {
    // tslint:disable-next-line:no-unused-expression
    this.security.SetAdmin(user, guard);
  }

// For getting Country
  public getCountry(): Observable<JsonPipe> {
    return this.http.get<JsonPipe>(this.countryApi)
      ;
  }

  public profileUpdate(data): Observable<any> {
    const id = this.CurrentUser._id;
    return this.http.put(`${this.Url}user/${id}`, data);
  }

  public displayPicUpdate(data): Observable<any> {
    return this.http.post(this.Url + 'upload', data);
  }

  public getUser(id): Observable<any> {
    return this.http.get(`${this.Url}user/${id}`);
  }

  get Role() {
    const role = {
      Admin: false,
      Customer: false,
      Worker: false
    }

    switch (this.CurrentUser.Role) {

      case 'Admin':
        role['Admin'] = true;
        break;
      case 'Worker':
        role['Worker'] = true;
        break;
      case 'Customer':
        role['Customer'] = true;
        break;
    }
    return role;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
