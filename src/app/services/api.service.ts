import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://obscure-beyond-81246.herokuapp.com/api';

  constructor(public http: HttpClient) { }

  google(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint, {responseType: 'text'});
  }

  login(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  signup(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  reset(endpoint: string, data: JSON) {
    return this.http.patch<any>(this.baseUrl + endpoint, data);
  }

  get(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint);
  }

  post(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  patch(endpoint: string, data: JSON) {
    return this.http.patch<any>(this.baseUrl + endpoint, data);
  }
}
