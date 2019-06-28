import {Injectable} from '@angular/core';
import {Auth} from '../Security/auth';
import {AppUser} from '../models/app-user';
import {AppUserWithAuth} from '../models/app-user-with-auth';
import {userError} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  SecurityObject: Auth = new Auth();

  constructor() {
    this.SecurityObject.isAuthenticated = false;
    this.SecurityObject.isCustomer = false;
    this.SecurityObject.isWorker = false;
    this.SecurityObject.isAdmin = false;

  }

  isauthenticated(): Boolean {
    // const userExist = localStorage.getItem(this.SecurityObject.user.Email);
    if (this.SecurityObject.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }

  setToken(guard: boolean): void {
    if (!guard) {
      this.removeToken();
      if ((this.SecurityObject.Token !== null || this.SecurityObject.Token !== undefined) && (this.SecurityObject.user !== null || this.SecurityObject.user !== undefined)) {
        localStorage.setItem('User', JSON.stringify(this.SecurityObject.user));
        localStorage.setItem('Token', this.SecurityObject.Token);
      }
    }
  }

  ResetUser() {
    this.SecurityObject.isAuthenticated = false;
    this.SecurityObject.isCustomer = false;
    this.SecurityObject.isWorker = false;
    this.SecurityObject.isAdmin = false;


  }

  logOut() {
    this.ResetUser();
    this.removeToken();
  }

  SetWorker(user: AppUserWithAuth, guard: boolean) {
    this.ResetUser();
    this.SecurityObject.isAuthenticated = true;
    this.SecurityObject.isWorker = true;
    this.SettingSecurityObject(user, guard);
    this.setToken(guard);
  }

  SetCustomer(user: AppUserWithAuth, guard: boolean) {
    this.ResetUser();
    this.SecurityObject.isAuthenticated = true;
    this.SecurityObject.isCustomer = true;
    this.SettingSecurityObject(user, guard);
    this.setToken(guard);
  }

  SetAdmin(user: AppUserWithAuth, guard: boolean) {
    this.ResetUser();
    this.SecurityObject.isAuthenticated = true;
    this.SecurityObject.isCustomer = true;
    this.SecurityObject.isWorker = true;
    this.SecurityObject.isAdmin = true;
    this.SettingSecurityObject(user, guard);
    this.setToken(guard);
  }

  private removeToken() {
    localStorage.clear();
  }

  private SettingSecurityObject(user: any, guard: boolean) {
    if (guard) {
      this.SecurityObject.user = user;
      this.SecurityObject.Token = localStorage.getItem('Token');
    } else {
      this.SecurityObject.user = user.user;
      this.SecurityObject.Token = user.token;
    }

  }

  get User() {
    return this.SecurityObject.user;
  }
}
