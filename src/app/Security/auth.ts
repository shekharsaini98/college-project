import {AppUser} from '../models/app-user';

export class Auth extends AppUser {
  public isAuthenticated = false;
  public isCustomer = false;
  public isWorker = false;
  public isAdmin = false;
  public Token: string;
  public user: AppUser;
}
