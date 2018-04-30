import { Injectable } from '@angular/core';
import { Scene } from '../models/scene';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SceneService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  constructor(private http: HttpClient) { }

  getAll(story_id): Observable<Scene[]> {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes';
    return this.http.get<Scene[]>(endpoint);
  }

  create(story_id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes';
    return this.http.post(endpoint, body);
  }

  update(story_id, id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + id;
    return this.http.put(endpoint, body);
  }

  delete(story_id, id) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + id;
    return this.http.delete(endpoint);
  }

  updateOrder(story_id, scene_ids) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/update_order';
    return this.http.put(endpoint, { data: scene_ids });
  }
}
