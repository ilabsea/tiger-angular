import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class StoryService {

  constructor(private http: HttpClient) { }

  getAll(page: number, perPage: number) {
    let endpoint = `${API_URL}stories?page=${page}&per_page=${perPage}`
    return this.http.get(endpoint);
  }

  create(body) {
    let endpoint = API_URL + 'stories';
    return this.http.post(endpoint, body);
  }

  update(id, body) {
    let endpoint = API_URL + 'stories/' + id;
    return this.http.put(endpoint, body);
  }

  delete(id) {
    let endpoint = API_URL + 'stories/' + id;
    return this.http.delete(endpoint);
  }

  clone(id, body) {
    let endpoint = API_URL + 'stories/' + id + '/clone';
    return this.http.post(endpoint, body);
  }
}
