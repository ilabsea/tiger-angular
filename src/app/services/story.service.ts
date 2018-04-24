import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizeService } from './authorize.service';

@Injectable()
export class StoryService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.authorizeService.TOKEN
    })
  };

  constructor(
    private http: HttpClient,
    private authorizeService: AuthorizeService,
  ) { }

  getAll() {
    let endpoint = this.API_URL + 'stories';
    return this.http.get(endpoint, this.httpOptions);
  }

  create(body) {
    let endpoint = this.API_URL + 'stories';
    return this.http.post(endpoint, body, this.httpOptions);
  }

  update(id, body) {
    let endpoint = this.API_URL + 'stories/' + id;
    return this.http.put(endpoint, body, this.httpOptions);
  }

  delete(id) {
    let endpoint = this.API_URL + 'stories/' + id;
    return this.http.delete(endpoint, this.httpOptions);
  }

  clone(id, body) {
    let endpoint = this.API_URL + 'stories/' + id + '/clone';
    return this.http.post(endpoint, body, this.httpOptions);
  }
}
