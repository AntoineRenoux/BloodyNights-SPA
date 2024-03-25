import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Focus } from '@core/models/game/focus';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  private baseUrl = environment.apiUrl + 'focus/';

  constructor(private http: HttpClient) { 
  }

  getFocus(): Observable<Focus[]> {
    return this.http.get<Focus[]>(this.baseUrl);
  }
}
