import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) { }

  getAll(options={}) {
    let params = '';

    if (!!options['story_id']) {
      params = `${params}story_id=${options['story_id']}&`;
    }

    if (!!options['tag_id']) {
      params = `${params}tag_id=${options['tag_id']}&`;
    }

    if (!!options['dateRange']) {
      params = `${params}${this._serialize(options['dateRange'])}`;
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
