import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from '../services/security.service';
import {PopUpService} from '../services/pop-up.service';
import {UserService} from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  /**
   *
   */
  constructor(private securityService: SecurityService, private router: Router,
              private popup: PopUpService, private  userService: UserService) {


  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    try {
      const user = JSON.parse(localStorage.getItem('User'))

      if (user.hasOwnProperty('Role')) {
        this.userService.User(user, true);
        return true;
      }
      return false;
    } catch (e) {
      if (this.userService.AmIAuthenticated()) {
        return true;
      }
      this.popup.openDialog2();
      this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
      return false;
    }

  }
}
