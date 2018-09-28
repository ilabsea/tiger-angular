import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(options={}) {
    let filter = '';

    if (!!options['status']) {
      filter = `&status=${options['status']}`;
    }

    let endpoint = `${API_URL}users?page=${options['page']}&per_page=${options['perPage']}${filter}`;
    return this.http.get(endpoint);
  }

  create(body) {
    let endpoint = API_URL + 'users';
    return this.http.post(endpoint, body);
  }

  update(id, body) {
    let endpoint = API_URL + 'users/' + id;
    return this.http.put(endpoint, body);
  }

  delete(id) {
    let endpoint = API_URL + 'users/' + id;
    return this.http.delete(endpoint);
  }
}
