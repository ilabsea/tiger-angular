import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class SceneService {
  constructor(private http: HttpClient) { }

  getAll(story_id) {
    let endpoint = API_URL + 'stories/' + story_id + '/scenes';
    return this.http.get(endpoint);
  }

  create(story_id, body) {
    let endpoint = API_URL + 'stories/' + story_id + '/scenes';
    return this.http.post(endpoint, body);
  }

  update(story_id, id, body) {
    let endpoint = API_URL + 'stories/' + story_id + '/scenes/' + id;
    return this.http.put(endpoint, body);
  }

  delete(story_id, id) {
    let endpoint = API_URL + 'stories/' + story_id + '/scenes/' + id;
    return this.http.delete(endpoint);
  }

  updateOrder(story_id, scene_ids) {
    let endpoint = API_URL + 'stories/' + story_id + '/scenes/update_order';
    return this.http.put(endpoint, { data: scene_ids });
  }
}
