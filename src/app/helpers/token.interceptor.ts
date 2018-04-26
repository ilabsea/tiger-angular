// https://github.com/angular/angular/issues/18224
// https://plnkr.co/edit/8CpyAUSJcCiRqdZmuvt9?p=preview
// https://stackoverflow.com/questions/48294197/angular-5-http-interceptors-error-when-injecting-service?rq=1

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
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.authentication_token) {
        request = request.clone({
            setHeaders: {
                Authorization: currentUser.authentication_token
            }
        });
    }
    return next.handle(request).catch((res) => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }

      return Observable.throw(res);
    });

  }
}
