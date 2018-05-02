import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class SceneActionService {
  constructor(private http: HttpClient) { }

  getAll(scene_id) {
    let endpoint = API_URL + 'scenes/' + scene_id + '/scene_actions';
    return this.http.get(endpoint);
  }

  create(scene_id, body) {
    let endpoint = API_URL + 'scenes/' + scene_id + '/scene_actions';
    return this.http.post(endpoint, body);
  }

  update(scene_id, id, body) {
    let endpoint = API_URL + 'scenes/' + scene_id + '/scene_actions/' + id;
    return this.http.put(endpoint, body);
  }

  delete(scene_id, id) {
    let endpoint = API_URL + 'scenes/' + scene_id + '/scene_actions/' + id;
    return this.http.delete(endpoint);
  }

  updateOrder(scene_id, body) {
    let endpoint = API_URL + 'scenes/' + scene_id + '/scene_actions/update_order';
    return this.http.put(endpoint, { data: body });
  }
}
