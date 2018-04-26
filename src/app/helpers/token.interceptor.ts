// https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthService } from './../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.auth.getCurrentUser();
    if (currentUser && currentUser.authentication_token) {
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.authentication_token
        }
      });
    }

    return next.handle(request).catch((res) => {
      if (res.status === 401 || res.status === 403) {
        this.auth.removeCurrentUser();
        this.router.navigate(['/login']);
      }

      return Observable.throw(res);
    });
  }
}
