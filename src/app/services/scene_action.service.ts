import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'ooPQFGQzFF94jWcwiEDD'
  })
};

@Injectable()
export class SceneActionService {
  API_URL: string = "http://192.168.1.107:3000/api/v1/";

  constructor(
    private http: HttpClient,
  ) { }

  getAll(scene_id) {
    let endpoint = this.API_URL + 'scenes/' + scene_id + '/scene_actions';
    return this.http.get(endpoint, httpOptions);
  }

  create(scene_id, body) {
    let endpoint = this.API_URL + 'scenes/' + scene_id + '/scene_actions';
    return this.http.post(endpoint, body, httpOptions);
  }

  update(scene_id, id, body) {
    let endpoint = this.API_URL + 'scenes/' + scene_id + '/scene_actions/' + id;
    return this.http.put(endpoint, body, httpOptions);
  }

  delete(scene_id, id) {
    let endpoint = this.API_URL + 'scenes/' + scene_id + '/scene_actions/' + id;
    return this.http.delete(endpoint, httpOptions);
  }

  updateOrder(scene_id, body) {
    let endpoint = this.API_URL + 'scenes/' + scene_id + '/scene_actions/update_order';
    return this.http.put(endpoint, { data: body }, httpOptions);
  }
}
