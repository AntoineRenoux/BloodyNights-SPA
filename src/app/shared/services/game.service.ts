import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDisciplines(): Observable<any> {
    return this.http.get(this.baseUrl + 'disciplines');
  }

  getDisciplineByKey(key: string) {
    return this.http.get(this.baseUrl + 'disciplines/' + key);
  }

  getClans(): Observable<any> {
    return this.http.get(this.baseUrl + 'clans');
  }

}
