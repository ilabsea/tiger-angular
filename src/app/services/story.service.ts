import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '_AQLUYK4QqHeT-298GKu'
  })
};

@Injectable()
export class StoryService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    let endpoint = this.API_URL + 'stories';
    return this.http.get(endpoint, httpOptions);
  }

  create(body) {
    let endpoint = this.API_URL + 'stories';
    return this.http.post(endpoint, body, httpOptions);
  }

  update(id, body) {
    let endpoint = this.API_URL + 'stories/' + id;
    return this.http.put(endpoint, body, httpOptions);
  }

  delete(id) {
    let endpoint = this.API_URL + 'stories/' + id;
    return this.http.delete(endpoint, httpOptions);
  }
}
