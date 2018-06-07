import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) { }

  getAll(option={}) {
    let params = '';
    if (!!option['story_id']) {
      params = `${params}story_id=${option['story_id']}&`;
    }
    if (!!option['time']) {
      params = `${params}${this._serialize(option['time'])}`;
    }

    let endpoint = `${API_URL}chart?${params}`;
    return this.http.get(endpoint);
  }

  _serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
}
