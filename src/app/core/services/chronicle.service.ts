import { Chronicle } from '@core/models/chronicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChronicleService {

  private baseUrl = environment.apiUrl + 'chronicle/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Chronicle[]>{
    return this.http.get<Chronicle[]>(this.baseUrl);
  }

  create(model: Chronicle) {
    return this.http.post(this.baseUrl, model);
  }
}
