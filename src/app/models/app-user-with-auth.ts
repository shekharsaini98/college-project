import {AppUser} from './app-user';

export class AppUserWithAuth extends AppUser {
  public user: AppUser;
  public token: string;
  public message: string;

}
