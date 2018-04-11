import { Injectable } from '@angular/core';
import { Scene } from '../models/scene';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SceneService {
  API_URL: string = "http://192.168.1.107:3000/api/";

  constructor(
    private http: HttpClient,
  ) { }

  getScenes(): Observable<Scene[]> {
    return this.http.get<Scene[]>(this.API_URL + 'scenes');
  }

  createScene(body) {
    let endpoint = this.API_URL + 'scenes';
    return this.http.post(endpoint, body);
  }

  updateScene(id, body) {
    let endpoint = this.API_URL + 'scenes/' + id;
    return this.http.put(endpoint, body);
  }

  deleteScene(id) {
    let endpoint = this.API_URL + 'scenes/' + id;
    return this.http.delete(endpoint);
  }
}
