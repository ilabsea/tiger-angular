import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn() {
    // return this.loggedIn.asObservable();
    return !!this.getCurrentUser();
  }

  constructor(private router: Router, private http: HttpClient, private api: ApiService) { }

  getCurrentUser(): User{
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  removeCurrentUser() {
    return localStorage.removeItem('currentUser');
  }

  login(user: User): Observable<User> {
    if (user.email !== '' && user.password != '' ) {
      return this.http.post<User>(this.api.loginUrl(), {session: user}).pipe(
        tap((user: User) =>
          localStorage.setItem('currentUser', JSON.stringify(user))
        )
      );
    }
  }

  logout(){
    this.router.navigate(['/']);
    localStorage.removeItem("currentUser");
  }

  isAdmin() {
    return this.getCurrentUser().role == 'admin';
  }
}
