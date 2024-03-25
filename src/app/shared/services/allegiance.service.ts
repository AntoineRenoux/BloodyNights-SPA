import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Allegiance } from '@core/models/game/allegiance';

@Injectable({
  providedIn: 'root'
})
export class AllegianceService {

  private baseUrl = environment.apiUrl + 'allegiance/';

  private allegiances$: BehaviorSubject<Allegiance[]> = new BehaviorSubject<Allegiance[]>(null);

  constructor(private http: HttpClient) { }

  getSects(): Observable<Allegiance[]> {
    if (this.allegiances$.value == null) {
      this.http.get<Allegiance[]>(this.baseUrl).subscribe((allegiances: Allegiance[]) => {
        this.allegiances$.next(allegiances);
      });
    }
    return this.allegiances$;
  }
}
