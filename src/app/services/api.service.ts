import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {
  loginUrl(): string{ return `${API_URL}sessions` };
  listUsersUrl(page: number, perPage: number): string{ return `${API_URL}users?page=${page}&per_page=${perPage}` };
}
