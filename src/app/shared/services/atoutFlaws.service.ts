import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtoutFlaws } from '@core/models/game/atoutFlaws';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtoutsFlawsService {

  private baseUrl = environment.apiUrl + 'atoutflaw/';

  constructor(private http: HttpClient) { 
  }

  get(): Observable<AtoutFlaws[]> {
    return this.http.get<AtoutFlaws[]>(this.baseUrl);
  }

}
