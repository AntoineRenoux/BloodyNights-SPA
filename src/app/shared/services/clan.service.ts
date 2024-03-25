import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clan } from '@core/models/game/clan';

@Injectable({
  providedIn: 'root'
})
export class ClanService {

  private baseUrl = environment.apiUrl + 'clan/';

  private clans$: BehaviorSubject<Clan[]> = new BehaviorSubject<Clan[]>(null);

  clanImportances: string[] = ["MAJOR", "MINOR", "BLOODLINE", "RARE"];

  constructor(private http: HttpClient) { }

  getClans(): Observable<Clan[]> {
    if (this.clans$.value == null) {
      this.http.get<Clan[]>(this.baseUrl).subscribe((clans: Clan[]) => {
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
    return this.http.get<Clan>(this.baseUrl + 'get-by-id/' + key);
  }
}
