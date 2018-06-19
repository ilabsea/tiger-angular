import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class TagService {
  constructor(private http: HttpClient) { }

  getAll() {
    let endpoint = `${API_URL}tags`
    return this.http.get(endpoint);
  }
}
