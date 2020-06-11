import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class NotificationTemplateService {
  constructor(private http: HttpClient) { }

  getAll(options={}) {
    let endpoint = `${API_URL}notifications?page=${options['page']}&per_page=${options['pageSize']}`;

    return this.http.get(endpoint);
  }

  create(body) {
    let endpoint = API_URL + 'notifications';
    return this.http.post(endpoint, body);
  }

  update(id, body) {
    let endpoint = API_URL + 'notifications/' + id;
    return this.http.put(endpoint, body);
  }

  getSetting() {
    let endpoint = API_URL + 'settings';
    return this.http.get(endpoint);
  }

  createSetting(body) {
    let endpoint = API_URL + 'settings';
    return this.http.post(endpoint, body);
  }
}
