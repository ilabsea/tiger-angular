import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) { }

  getAll(option={}) {
    // let endpoint = `${API_URL}stories?page=${page}&per_page=${perPage}`
    let params = '?';
    if (!!option['story_id']) {
      params = `${params}story_id=${option['story_id']}&`;
    }
    if (!!option['time']) {
      let time = option['time'];
      params = `${params}period=${time['period']}&period_unit=${time['unit']}`;
    }

    // let endpoint = API_URL + 'story_downloads';
    let endpoint = `${API_URL}story_downloads${params}`;
    return this.http.get(endpoint);
  }

  create(body) {
    let endpoint = API_URL + 'story_downloads';
    return this.http.post(endpoint, body);
  }
}
