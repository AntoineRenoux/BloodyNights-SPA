import { ItemMenu } from '@core/models/itemMenu';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clan } from '@core/models/game/clan';
import { Discipline } from '@core/models/game/discipline';
import { Skill } from '@core/models/game/skill';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseUrl = environment.apiUrl;
  itemsMenuForNavigation$: BehaviorSubject<ItemMenu[]> = new BehaviorSubject<ItemMenu[]>(null);
  private disciplines$: BehaviorSubject<Discipline[]> = new BehaviorSubject<Discipline[]>(null);
  private clans$: BehaviorSubject<Clan[]> = new BehaviorSubject<Clan[]>(null);
  private skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>(null);

  constructor(private http: HttpClient) { }

  getDisciplines(): Observable<any> {
    if (this.disciplines$.value == null) {
      this.http.get(this.baseUrl + 'disciplines').subscribe((disciplines : Discipline[]) => {
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

  getClans(): Observable<Clan[]> {
    if (this.clans$.value == null) {
      this.http.get<Clan[]>(this.baseUrl + 'clans').subscribe((clans: Clan[]) => {
        this.clans$.next(clans);
      });
    }
    return this.clans$;
  }

  getClanByKey(key: string): Observable<Clan> {
    if (this.clans$.value != null) {
      let ret = new BehaviorSubject<Clan>(this.clans$.getValue().find(x => x.key == key.toUpperCase()));
      if (ret.value != null) {
        return ret;
      }
    }
    return this.http.get<Clan>(this.baseUrl + 'clans/' + key);
  }

  getSkills(): Observable<Skill[]> {
    if (this.skills$.value == null) {
      this.http.get<Skill[]>(this.baseUrl + 'skills').subscribe((skills: Skill[]) => {
        this.skills$.next(skills);
      })
    }
    return this.skills$;
  }

}
