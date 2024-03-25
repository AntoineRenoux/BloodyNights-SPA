import { Allegiance } from './../../core/models/game/allegiance';
import { ItemMenu } from '@core/models/itemMenu';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clan } from '@core/models/game/clan';
import { Discipline } from '@core/models/game/discipline';
import { Skill } from '@core/models/game/skill';
import { Archetype } from '@core/models/game/archetype';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  private baseUrl = environment.apiUrl + 'discipline/';

  private disciplines$: BehaviorSubject<Discipline[]> = new BehaviorSubject<Discipline[]>(null);

  constructor(private http: HttpClient) { }

  getDisciplines(): Observable<Discipline[]> {
    if (this.disciplines$.value == null) {
      this.http.get<Discipline[]>(this.baseUrl + 'disciplines').subscribe((disciplines : Discipline[]) => {
        this.disciplines$.next(disciplines);
      })
    }
    return this.disciplines$;
  }

  getDisciplineByKey(key: string): Observable<Discipline> {
    if (this.disciplines$.value != null) {
      let ret = new BehaviorSubject<Discipline>(this.disciplines$.getValue().find(x => x.key == key.toUpperCase()));
      if (ret.value != null) {
        return ret;
      }
    }
    return this.http.get<Discipline>(this.baseUrl + 'disciplines/' + key);
  }
}
