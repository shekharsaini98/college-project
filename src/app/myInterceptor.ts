import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './services/user-service.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userservice: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const Token = localStorage.getItem('Token');
    // console.log(currentUser);
    if (Token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${Token}`
        }
      });

    }

    return next.handle(request);
  }
}
