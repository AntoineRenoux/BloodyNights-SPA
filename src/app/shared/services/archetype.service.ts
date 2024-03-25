import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archetype } from '@core/models/game/archetype';

@Injectable({
  providedIn: 'root'
})
export class ArchetypeService {

  private baseUrl = environment.apiUrl + 'archetype/';

  private archetypes$: BehaviorSubject<Archetype[]> = new BehaviorSubject<Archetype[]>(null);

  constructor(private http: HttpClient) { }

  getArchetypes(): Observable<Archetype[]>{
    if (this.archetypes$.value == null) {
      this.http.get<Archetype[]>(this.baseUrl).subscribe((archetypes: Archetype[]) => {
        this.archetypes$.next(archetypes);
      })
    }
    return this.archetypes$;
  }
}
