import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historic } from '@core/models/game/historic';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  private baseUrl = environment.apiUrl + 'historics';

  constructor(private http: HttpClient) { 
  }

  getHistorics(): Observable<Historic[]> {
    return this.http.get<Historic[]>(this.baseUrl);
  }
}

