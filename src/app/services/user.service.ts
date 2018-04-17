import { Injectable } from '@angular/core';
import { USERS } from './../mocks/mock-users';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  dialogData: any;

  constructor(private http: HttpClient, private api: ApiService) { }

  // getUsers(page: number): Observable<User[]> {
  //   // return this.http.get<User[]>(this.api.listUsersUrl(page));
  //   return this.http.get(this.api.listUsersUrl(page)).map(
  //                                                         (response:Response) =>
  //                                                           response['data']
  //                                                         );
  // }

  getDialogData() {
    return this.dialogData;
  }

  getUsers(page: number, perPage: number): Observable<any> {
    return this.http.get<User[]>(this.api.listUsersUrl(page, perPage));
  }

  addUser (user: User): void {
    this.dialogData = user;
  }

  private log(message: string) {
    console.log('Service: ' + message);
  }
}
