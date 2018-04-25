import { Injectable } from '@angular/core';
import { Scene } from '../models/scene';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'ZzA84aHAAeWtW9dhpfyn'
  })
};

@Injectable()
export class SceneService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  constructor(
    private http: HttpClient,
  ) { }

  getScenes(story_id): Observable<Scene[]> {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes';
    return this.http.get<Scene[]>(endpoint, httpOptions);
  }

  createScene(story_id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes';
    return this.http.post(endpoint, body, httpOptions);
  }

  updateScene(story_id, id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + id;
    return this.http.put(endpoint, body, httpOptions);
  }

  deleteScene(story_id, id) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + id;
    return this.http.delete(endpoint, httpOptions);
  }
}
