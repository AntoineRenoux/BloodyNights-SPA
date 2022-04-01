import { ItemMenu } from '@core/models/itemMenu';
import { Discipline } from '@core/models/game/discipline';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseUrl = environment.apiUrl;
  itemsMenuForNavigation$: BehaviorSubject<ItemMenu[]> = new BehaviorSubject<ItemMenu[]>(null);
  private disciplines$: BehaviorSubject<Discipline[]> = new BehaviorSubject<Discipline[]>(null);

  constructor(private http: HttpClient) { }

  getDisciplines(): Observable<any> {
    if (this.disciplines$.value == null) {
      this.http.get(this.baseUrl + 'disciplines').subscribe((disciplines : Discipline[]) => {
        this.disciplines$.next(disciplines);
      })
    }
    return this.disciplines$;
  }

  getDisciplineByKey(key: string) {
    return this.http.get(this.baseUrl + 'disciplines/' + key);
  }

  getClans(): Observable<any> {
    return this.http.get(this.baseUrl + 'clans');
  }

}
