import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '_AQLUYK4QqHeT-298GKu'
  })
};

@Injectable()
export class SceneActionService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  constructor(
    private http: HttpClient,
  ) { }

  getAll(story_id, scene_id) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + scene_id + '/scene_actions';
    return this.http.get(endpoint, httpOptions);
  }

  create(story_id, scene_id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + scene_id + '/scene_actions';
    return this.http.post(endpoint, body, httpOptions);
  }

  update(story_id, scene_id, id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + scene_id + '/scene_actions/' + id;
    return this.http.put(endpoint, body, httpOptions);
  }

  delete(story_id, scene_id, id) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + scene_id + '/scene_actions/' + id;
    return this.http.delete(endpoint, httpOptions);
  }

  updateOrder(story_id, scene_id, body) {
    let endpoint = this.API_URL + 'stories/' + story_id + '/scenes/' + scene_id + '/scene_actions/update_order';
    return this.http.put(endpoint, { data: body }, httpOptions);
  }
}
