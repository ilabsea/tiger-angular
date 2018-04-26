import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StoryService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  constructor(private http: HttpClient) { }

  getAll() {
    let endpoint = this.API_URL + 'stories';
    return this.http.get(endpoint);
  }

  create(body) {
    let endpoint = this.API_URL + 'stories';
    return this.http.post(endpoint, body);
  }

  update(id, body) {
    let endpoint = this.API_URL + 'stories/' + id;
    return this.http.put(endpoint, body);
  }

  delete(id) {
    let endpoint = this.API_URL + 'stories/' + id;
    return this.http.delete(endpoint);
  }

  clone(id, body) {
    let endpoint = this.API_URL + 'stories/' + id + '/clone';
    return this.http.post(endpoint, body);
  }
}
